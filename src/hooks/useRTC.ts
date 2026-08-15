import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useSocket } from './useSocket';
import { SOCKET_EVENTS } from '@/constants/socketEvents';
import type { User } from '@/types';
import { toast } from 'sonner';

interface VideoCallState {
  isInCall: boolean;
  isIncomingCall: boolean;
  caller: User | null;
  callee: User | null;
  roomId: string | null;
  audioOnly: boolean;
  callStatus: 'idle' | 'calling' | 'ringing' | 'connecting' | 'connected' | 'ended' | 'declined';
}

export function useRTC() {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [callState, setCallState] = useState<VideoCallState>({
    isInCall: false,
    isIncomingCall: false,
    caller: null,
    callee: null,
    roomId: null,
    audioOnly: false,
    callStatus: 'idle',
  });

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const pendingOfferRef = useRef<RTCSessionDescriptionInit | null>(null);
  const pendingCandidatesRef = useRef<RTCIceCandidate[]>([]);
  const busyRef = useRef(false);
  const ringtoneRef = useRef<{ stop: () => void } | null>(null);

  const { socket, on, off, isConnected } = useSocket();

  const servers = useMemo(
    () => {
      const iceServers: RTCIceServer[] = [
        {
          urls: [
            'stun:stun1.l.google.com:19302',
            'stun:stun2.l.google.com:19302',
          ],
        },
      ];

      // TURN relays traffic when a direct STUN connection can't be made
      // (mobile devices behind symmetric NAT, cellular networks, etc.).
      // Configure via VITE_TURN_URL (comma-separated for multiple endpoints)
      // plus VITE_TURN_USERNAME / VITE_TURN_CREDENTIAL (e.g. Metered).
      const turnUrl = import.meta.env.VITE_TURN_URL;
      const turnUsername = import.meta.env.VITE_TURN_USERNAME;
      const turnCredential = import.meta.env.VITE_TURN_CREDENTIAL;

      if (turnUrl) {
        const urls = turnUrl
          .split(',')
          .map((u: string) => u.trim())
          .filter(Boolean);
        if (urls.length > 0) {
          const turnServer: RTCIceServer = { urls };
          if (turnUsername && turnCredential) {
            turnServer.username = turnUsername;
            turnServer.credential = turnCredential;
          }
          iceServers.push(turnServer);
        }
      } else if (import.meta.env.DEV) {
        // Free public relay for local development only (limited bandwidth).
        iceServers.push({ urls: 'turn:openrelay.metered.ca:80' });
      }

      return { iceServers };
    },
    []
  );

  // Fetch ephemeral STUN/TURN credentials from Twilio (via the backend) so
  // mobile calls can traverse symmetric NATs. Returns null on failure so the
  // base servers are still used as a fallback.
  const fetchTwilioTurn = useCallback(async (): Promise<RTCIceServer[] | null> => {
    try {
      const res = await fetch('/api/v1/users/turn/credentials', {
        credentials: 'include',
      });
      if (!res.ok) return null;
      const json = await res.json();
      if (!json.success) return null;
      const servers = json.data;
      return Array.isArray(servers) && servers.length > 0 ? servers : null;
    } catch (error) {
      console.error('Failed to fetch Twilio TURN credentials:', error);
      return null;
    }
  }, []);

  const resetToIdle = useCallback((callStatus: VideoCallState['callStatus'] = 'idle') => {
    busyRef.current = false;
    pendingOfferRef.current = null;
    pendingCandidatesRef.current = [];
    setLocalStream((prev) => {
      prev?.getTracks().forEach((track) => track.stop());
      return null;
    });
    localStreamRef.current = null;
    setRemoteStream(null);
    setIsMuted(false);
    setIsVideoOff(false);
    setCallState({
      isInCall: false,
      isIncomingCall: false,
      caller: null,
      callee: null,
      roomId: null,
      audioOnly: false,
      callStatus,
    });
  }, []);

  const cleanupPeerConnection = useCallback(() => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
  }, []);

  const stopRingtone = useCallback(() => {
    ringtoneRef.current?.stop();
    ringtoneRef.current = null;
  }, []);

  // Lightweight ringtone generated with the Web Audio API so no static asset
  // is required. The returned handle stops the tone (including its loop).
  const startRingtone = useCallback(() => {
    stopRingtone();
    try {
      const AudioCtx = window.AudioContext;
      const context = new AudioCtx();
      const gain = context.createGain();
      gain.connect(context.destination);
      gain.gain.value = 0.08;

      let stop = false;

      const beep = (freq: number, start: number, duration: number) => {
        const oscillator = context.createOscillator();
        const oscGain = context.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.value = freq;
        oscGain.gain.setValueAtTime(0.0001, context.currentTime + start);
        oscGain.gain.exponentialRampToValueAtTime(
          1,
          context.currentTime + start + 0.02
        );
        oscGain.gain.setValueAtTime(
          1,
          context.currentTime + start + duration - 0.02
        );
        oscGain.gain.exponentialRampToValueAtTime(
          0.0001,
          context.currentTime + start + duration
        );
        oscillator.connect(oscGain);
        oscGain.connect(gain);
        oscillator.start(context.currentTime + start);
        oscillator.stop(context.currentTime + start + duration + 0.05);
      };

      const scheduleRing = () => {
        if (stop) return;
        const now = context.currentTime;
        beep(800, now, 0.4);
        beep(800, now + 0.55, 0.4);
        beep(1000, now + 1.1, 0.4);
        window.setTimeout(() => {
          if (!stop) {
            scheduleRing();
          }
        }, 2000);
      };

      scheduleRing();

      ringtoneRef.current = {
        stop: () => {
          stop = true;
          context.close().catch(() => undefined);
        },
      };
    } catch (error) {
      console.error('Failed to play ringtone:', error);
    }
  }, [stopRingtone]);

  const grabLocalMedia = useCallback(
    async (audioOnly: boolean) => {
      const constraints: MediaStreamConstraints = audioOnly
        ? { audio: true, video: false }
        : { audio: true, video: { width: 1280, height: 720 } };
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        setLocalStream(stream);
        localStreamRef.current = stream;
        return stream;
      } catch (error) {
        console.error('Error accessing media devices:', error);
        toast.error('Could not access your camera and microphone. Please check permissions.');
        throw error;
      }
    },
    []
  );

  const createPeerConnection = useCallback(
    (to: string, iceServers?: RTCIceServer[]) => {
      const peerConnection = new RTCPeerConnection(
        iceServers ? { iceServers } : servers,
      );

      peerConnection.ontrack = (event) => {
        setRemoteStream((prevStream) => {
          const updatedStream = prevStream || new MediaStream();
          event.streams[0].getTracks().forEach((track) => {
            if (!updatedStream.getTracks().some((t) => t.kind === track.kind)) {
              updatedStream.addTrack(track);
            }
          });
          return updatedStream;
        });
      };

      localStreamRef.current?.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStreamRef.current!);
      });

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket?.emit(SOCKET_EVENTS.RTC_EVENT, {
            type: 'candidate',
            candidate: event.candidate,
            to,
          });
        }
      };

      peerConnection.onconnectionstatechange = () => {
        const state = peerConnection.connectionState;
        if (state === 'connected') {
          setCallState((prev) => ({ ...prev, callStatus: 'connected' }));
        } else if (state === 'disconnected' || state === 'failed') {
          setCallState((prev) => ({ ...prev, callStatus: 'ended' }));
          toast.error('Call connection lost');
        }
      };

      peerConnectionRef.current = peerConnection;
      return peerConnection;
    },
    [servers, socket]
  );

  const flushPendingCandidates = useCallback(async () => {
    const pc = peerConnectionRef.current;
    if (!pc) return;
    const candidates = pendingCandidatesRef.current;
    pendingCandidatesRef.current = [];
    for (const candidate of candidates) {
      try {
        await pc.addIceCandidate(candidate);
      } catch (error) {
        console.error('Error adding ICE candidate:', error);
      }
    }
  }, []);

  const startCall = useCallback(
    async (to: string, callee: User, audioOnly = false) => {
      if (busyRef.current) return;
      busyRef.current = true;

      try {
        const twilioServers = await fetchTwilioTurn();
        const iceServers = twilioServers ?? undefined;

        await grabLocalMedia(audioOnly);
        const peerConnection = createPeerConnection(to, iceServers);
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        pendingOfferRef.current = offer;

        socket?.emit(SOCKET_EVENTS.VIDEO_CALL_REQUEST, { to, audioOnly });

        setCallState({
          isInCall: true,
          isIncomingCall: false,
          caller: null,
          callee,
          roomId: to,
          audioOnly,
          callStatus: 'calling',
        });
      } catch (error) {
        console.error('Error starting call:', error);
        busyRef.current = false;
      }
    },
    [createPeerConnection, grabLocalMedia, socket, fetchTwilioTurn]
  );

  const handleIncomingCall = useCallback(
    (caller: User, audioOnly = false) => {
      if (busyRef.current) {
        socket?.emit(SOCKET_EVENTS.VIDEO_CALL_RESPONSE, {
          to: caller._id,
          verdict: 'rejected',
        });
        return;
      }
      busyRef.current = true;
      setCallState({
        isInCall: false,
        isIncomingCall: true,
        caller,
        callee: null,
        roomId: caller._id,
        audioOnly,
        callStatus: 'ringing',
      });
      startRingtone();
    },
    [busyRef, socket, startRingtone]
  );

  const acceptCall = useCallback(async () => {
    if (!callState.caller) return;

    stopRingtone();

    socket?.emit(SOCKET_EVENTS.VIDEO_CALL_RESPONSE, {
      to: callState.caller._id,
      verdict: 'accepted',
    });

    // Prepare the callee side immediately so ICE candidates can be received
    // while the offer is in flight.
    try {
      const twilioServers = await fetchTwilioTurn();
      await grabLocalMedia(callState.audioOnly);
      createPeerConnection(callState.caller._id, twilioServers ?? undefined);
    } catch (error) {
      console.error('Error accepting call:', error);
    }

    setCallState((prev) => ({
      ...prev,
      isInCall: true,
      isIncomingCall: false,
      callStatus: 'connecting',
    }));
  }, [callState.caller, callState.audioOnly, createPeerConnection, fetchTwilioTurn, grabLocalMedia, socket, stopRingtone]);

  const declineCall = useCallback(() => {
    if (callState.caller) {
      socket?.emit(SOCKET_EVENTS.VIDEO_CALL_RESPONSE, {
        to: callState.caller._id,
        verdict: 'rejected',
      });
    } else if (callState.callee) {
      // Caller cancelling before the callee answered.
      socket?.emit(SOCKET_EVENTS.VIDEO_CALL_RESPONSE, {
        to: callState.callee._id,
        verdict: 'rejected',
      });
    }

    stopRingtone();
    cleanupPeerConnection();
    resetToIdle('declined');
  }, [callState.caller, callState.callee, cleanupPeerConnection, resetToIdle, socket, stopRingtone]);

  const endCall = useCallback(() => {
    stopRingtone();
    cleanupPeerConnection();
    resetToIdle('ended');
  }, [cleanupPeerConnection, resetToIdle, stopRingtone]);

  const handleVideoCallResponse = useCallback(
    (data: { from: User; verdict?: string }) => {
      if (data.verdict === 'rejected') {
        stopRingtone();
        cleanupPeerConnection();
        resetToIdle('declined');
        toast.error('Call declined');
      } else if (data.verdict === 'accepted') {
        if (pendingOfferRef.current) {
          socket?.emit(SOCKET_EVENTS.RTC_EVENT, {
            type: 'offer',
            offer: pendingOfferRef.current,
            to: data.from._id,
          });
          pendingOfferRef.current = null;
          setCallState((prev) => ({ ...prev, callStatus: 'connecting' }));
        }
      }
    },
    [cleanupPeerConnection, resetToIdle, socket, stopRingtone]
  );

  const handleRTCEvent = useCallback(
    async (data: {
      type: string;
      offer?: RTCSessionDescriptionInit;
      answer?: RTCSessionDescriptionInit;
      candidate?: RTCIceCandidate;
      from?: string;
    }) => {
      switch (data.type) {
        case 'offer':
          if (data.offer && data.from) {
            try {
              const pc =
                peerConnectionRef.current || createPeerConnection(data.from);
              await pc.setRemoteDescription(data.offer);
              const answer = await pc.createAnswer();
              await pc.setLocalDescription(answer);

              socket?.emit(SOCKET_EVENTS.RTC_EVENT, {
                type: 'answer',
                answer,
                to: data.from,
              });

              stopRingtone();
              setCallState((prev) => ({
                ...prev,
                isInCall: true,
                isIncomingCall: false,
                callStatus: 'connected',
              }));
              await flushPendingCandidates();
            } catch (error) {
              console.error('Error creating answer:', error);
              toast.error('Failed to accept call');
            }
          }
          break;

        case 'answer':
          if (data.answer) {
            try {
              const pc = peerConnectionRef.current;
              if (pc && !pc.currentRemoteDescription) {
                await pc.setRemoteDescription(data.answer);
              }
              setCallState((prev) => ({ ...prev, callStatus: 'connected' }));
              await flushPendingCandidates();
            } catch (error) {
              console.error('Error adding answer:', error);
            }
          }
          break;

        case 'candidate':
          if (data.candidate) {
            const pc = peerConnectionRef.current;
            if (pc && pc.remoteDescription) {
              try {
                await pc.addIceCandidate(data.candidate);
              } catch (error) {
                console.error('Error adding ICE candidate:', error);
              }
            } else {
              pendingCandidatesRef.current.push(data.candidate);
            }
          }
          break;

        default:
          console.log(`Unhandled RTC event type: ${data.type}`);
      }
    },
    [createPeerConnection, flushPendingCandidates, socket, stopRingtone]
  );

  // Handle socket events
  useEffect(() => {
    const handleVideoCallRequest = (data: { from: User; audioOnly?: boolean }) => {
      handleIncomingCall(data.from, data.audioOnly ?? false);
    };

    on(SOCKET_EVENTS.VIDEO_CALL_REQUEST, handleVideoCallRequest);
    on(SOCKET_EVENTS.VIDEO_CALL_RESPONSE, handleVideoCallResponse);
    on(SOCKET_EVENTS.RTC_EVENT, handleRTCEvent);

    return () => {
      off(SOCKET_EVENTS.VIDEO_CALL_REQUEST, handleVideoCallRequest);
      off(SOCKET_EVENTS.VIDEO_CALL_RESPONSE, handleVideoCallResponse);
      off(SOCKET_EVENTS.RTC_EVENT, handleRTCEvent);
    };
  }, [on, off, isConnected, handleIncomingCall, handleVideoCallResponse, handleRTCEvent]);

  const toggleMute = useCallback(() => {
    const audioTrack = localStreamRef.current?.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setIsMuted(!audioTrack.enabled);
    }
  }, []);

  const toggleVideo = useCallback(() => {
    const videoTrack = localStreamRef.current?.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoOff(!videoTrack.enabled);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopRingtone();
      cleanupPeerConnection();
      localStreamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [cleanupPeerConnection, stopRingtone]);

  return {
    localStream,
    remoteStream,
    callState,
    isMuted,
    isVideoOff,
    startCall,
    acceptCall,
    declineCall,
    endCall,
    toggleMute,
    toggleVideo,
    stopRingtone,
  };
}
