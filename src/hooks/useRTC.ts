import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import useSockets from "./useSockets";
import { SOCKET_EVENTS } from "@/constants/socketEvents";

const useRTC = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [constraints, setConstraints] = useState<MediaStreamConstraints>({
    audio: true,
    video: { width: 1280, height: 720 },
  });
  const { socket } = useSockets();
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

  const servers = useMemo(
    () => ({
      iceServers: [
        {
          urls: [
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
          ],
        },
      ],
    }),
    []
  );

  const grabLocalMedia = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setLocalStream(stream);
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  }, [constraints]);
  const createPeerConnection = useCallback(
    async (to: string) => {
      console.log("Creating peer connection with:", to);
      const peerConnection = new RTCPeerConnection(servers);
      peerConnection.ontrack = (event) => {
        setRemoteStream((prevStream) => {
          console.log("Received remote stream.");
          const updatedStream = prevStream || new MediaStream();
          event.streams[0].getTracks().forEach((track) => {
            updatedStream.addTrack(track);
          });
          return updatedStream;
        });
      };

      if (!localStream) {
        await grabLocalMedia();
      }

      localStream?.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("Sending ICE candidate to:", to);
          socket?.emit(SOCKET_EVENTS.RTC_EVENT, {
            type: "candidate",
            candidate: event.candidate,
            to,
          });
        }
      };

      peerConnectionRef.current = peerConnection;
      return peerConnectionRef.current;
    },
    [localStream, grabLocalMedia, socket, servers]
  );

  const createOffer = async (to: string) => {
    if (!localStream)
      throw new Error("Local stream not initialized. Call startRTC first.");
    const peerConnection = await createPeerConnection(to);
    if (!peerConnection) {
      return;
    }
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    console.log("Sending offer to:", to);
    socket?.emit(SOCKET_EVENTS.RTC_EVENT, {
      type: "offer",
      offer,
      to,
    });
  };

  const createAnswer = useCallback(
    async (offer: RTCSessionDescriptionInit, from: string) => {
      try {
        if (!localStream) await grabLocalMedia();
        const peerConnection = await createPeerConnection(from);
        if (!peerConnection) {
          return;
        }
        try {
          await peerConnection.setRemoteDescription(offer);
        } catch (error) {
          console.error("Error setting remote description:", error);
        }
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        console.log("Sending answer to:", from);
        if (socket) {
          socket.emit(SOCKET_EVENTS.RTC_EVENT, {
            type: "answer",
            answer,
            to: from,
          });
        }
      } catch (error) {
        console.error("Error while creating or sending the answer:", error);
      }
    },
    [localStream, grabLocalMedia, createPeerConnection, socket]
  );

  const addAnswer = useCallback(async (answer: RTCSessionDescriptionInit) => {
    try {
      if (!peerConnectionRef.current?.currentRemoteDescription) {
        await peerConnectionRef.current?.setRemoteDescription(answer);
      }
    } catch (error) {
      console.error("Error adding answer:", error);
    }
  }, []);

  const closePeerConnection = useCallback(() => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
  }, []);

  useEffect(() => {
    const handleRTCEvent = async (data: {
      type: string;
      offer?: RTCSessionDescriptionInit;
      answer?: RTCSessionDescriptionInit;
      candidate?: RTCIceCandidate;
      from?: string;
    }) => {
      switch (data.type) {
        case "offer":
          await createAnswer(data.offer!, data.from!);
          break;

        case "answer":
          await addAnswer(data.answer!);
          break;

        case "candidate":
          if (peerConnectionRef.current) {
            try {
              await peerConnectionRef.current.addIceCandidate(data.candidate);
            } catch (error) {
              console.error("Error adding ICE candidate:", error);
            }
          }
          break;

        default:
          console.log(`Unhandled RTC event type: ${data.type}`);
      }
    };

    socket?.on(SOCKET_EVENTS.RTC_EVENT, handleRTCEvent);

    return () => {
      socket?.off(SOCKET_EVENTS.RTC_EVENT, handleRTCEvent);
      closePeerConnection();
    };
  }, [socket, createAnswer, addAnswer, closePeerConnection]);

  return {
    localStream,
    remoteStream,
    grabLocalMedia,
    createOffer,
    createAnswer,
    setLocalStream,
    setRemoteStream,
    constraints,
    setConstraints,
    peerConnectionRef,
    addAnswer,
    createPeerConnection,
    closePeerConnection,
  };
};

export default useRTC;
