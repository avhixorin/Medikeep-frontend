import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import useSockets from "./useSockets";
import { SOCKET_EVENTS } from "@/constants/socketEvents";

const useRTC = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [toId, setToId] = useState<string | null>(null);
  const [constraints, setConstraints] = useState<MediaStreamConstraints>({
    audio: true,
    video: { width: 1280, height: 720 },
  });

  const servers = useMemo(
    () => ({
      iceServers: [
        {
          urls: ["stun:stun.l.google.com:19302", "stun:global.stun.twilio.com:3478"],
        },
      ],
    }),
    []
  );

  const peerConnectionRef = useRef<RTCPeerConnection | null>(
    new RTCPeerConnection(servers)
  );

  const { socket } = useSockets();

  const grabLocalMedia = useCallback(async () => {
    try {
      console.log("Accessing media devices with constraints:", constraints);
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setLocalStream(stream);
    } catch (error) {
      console.error("Error accessing media devices:", error);
      alert("Could not access your camera and microphone. Please check permissions.");
    }
  }, [constraints]);

  const createOffer = useCallback(async () => {
    try {
      const peer = peerConnectionRef.current;
      if (!peer) return;

      console.log("Creating offer...");
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
      return offer;
    } catch (error) {
      console.error("Error creating offer:", error);
    }
  }, []);

  const createAnswer = useCallback(async (offer: RTCSessionDescriptionInit) => {
    try {
      const peer = peerConnectionRef.current;
      if (!peer) return;

      console.log("Setting remote description (offer)...");
      await peer.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);
      return answer;
    } catch (error) {
      console.error("Error creating answer:", error);
    }
  }, []);

  const addAnswer = useCallback(async (answer: RTCSessionDescriptionInit) => {
    try {
      const peer = peerConnectionRef.current;
      if (!peer) return;

      console.log("Adding answer...");
      await peer.setRemoteDescription(new RTCSessionDescription(answer));
    } catch (error) {
      console.error("Error adding answer:", error);
    }
  }, []);

  const sendStream = useCallback((stream: MediaStream) => {
    const peer = peerConnectionRef.current;
    if (!peer) return;

    console.log("Sending stream...");
    stream.getTracks().forEach((track) => peer.addTrack(track, stream));
  }, []);

  const handleRemoteStream = useCallback((event: RTCTrackEvent) => {
    console.log("Receiving remote stream:", event);
    if (event.streams[0]) setRemoteStream(event.streams[0]);
  }, []);

  const handleNegotiationNeeded = useCallback(async () => {
    try {
      console.log("Negotiation needed...");
      const offer = await createOffer();
      if (offer) {
        socket?.emit(SOCKET_EVENTS.NEGOTIATION_NEEDED, { to: toId, offer });
      }
    } catch (error) {
      console.error("Error handling negotiation:", error);
    }
  }, [createOffer, socket, toId]);

  const closePeerConnection = useCallback(() => {
    const peer = peerConnectionRef.current;
    if (peer) {
      peer.close();
      peerConnectionRef.current = null;
      console.log("Peer connection closed.");
    }
    setLocalStream(null);
    setRemoteStream(null);
  }, []);

  const handleIceCandidate = useCallback((event: RTCPeerConnectionIceEvent) => {
    if (event.candidate) {
      console.log("Sending ICE candidate...");
      socket?.emit(SOCKET_EVENTS.ICE_CANDIDATE, { to: toId, candidate: event.candidate });
    }
  }, [socket, toId]);

  const addIceCandidate = useCallback(async (candidate: RTCIceCandidateInit) => {
    try {
      const peer = peerConnectionRef.current;
      if (peer) {
        console.log("Adding ICE candidate...");
        console.log("Candidate", candidate)
        await peer.addIceCandidate(new RTCIceCandidate(candidate));
      }
    } catch (error) {
      console.error("Error adding ICE candidate:", error);
    }
  }, []);

  useEffect(() => {
    const peer = peerConnectionRef.current;
    if (!peer) return;

    peer.addEventListener("track", handleRemoteStream);
    peer.addEventListener("negotiationneeded", handleNegotiationNeeded);
    peer.addEventListener("icecandidate", handleIceCandidate);

    return () => {
      peer.removeEventListener("track", handleRemoteStream);
      peer.removeEventListener("negotiationneeded", handleNegotiationNeeded);
      peer.removeEventListener("icecandidate", handleIceCandidate);
      // closePeerConnection();
    };
  }, [handleRemoteStream, handleNegotiationNeeded, handleIceCandidate]);

  return {
    localStream,
    remoteStream,
    setToId,
    grabLocalMedia,
    createOffer,
    createAnswer,
    addAnswer,
    addIceCandidate,
    sendStream,
    closePeerConnection,
    setConstraints,
    constraints,
  };
};

export default useRTC;
