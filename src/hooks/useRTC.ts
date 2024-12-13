import { useState, useRef, useCallback, useMemo } from "react";
import useSockets from "./useSockets";
import { Appointment } from "@/types/types";
import { SOCKET_EVENTS } from "@/constants/socketEvents";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

const useRTC = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [constraints, setConstraints] = useState<MediaStreamConstraints>({
    audio: true,
    video: true,
  });
  const { socket } = useSockets();
  const user = useSelector((state: RootState) => state.auth.user);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

  const servers = useMemo(() => ({
    iceServers: [
      {
        urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
      },
    ],
  }), []);

  const initializePeerConnection = useCallback((appointment: Appointment) => {
    if (!peerConnectionRef.current) {
      const peerConnection = new RTCPeerConnection(servers);

      // Handle remote tracks
      peerConnection.ontrack = (event) => {
        setRemoteStream((prevStream) => {
          const updatedStream = prevStream || new MediaStream();
          event.streams[0].getTracks().forEach((track) => {
            updatedStream.addTrack(track);
          });
          return updatedStream;
        });
      };

      // Handle ICE candidates
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket?.emit(SOCKET_EVENTS.RTC_EVENT, {
            type: "candidate",
            candidate: event.candidate,
            to: user?.role === "doctor" ? appointment.patient?._id : appointment.doctor?._id,
            appointment,
          });
        }
      };

      peerConnectionRef.current = peerConnection;
    }
    return peerConnectionRef.current;
  }, [socket, user, servers]);

  const startRTC = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setLocalStream(stream);
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  }, [constraints]);

  const addTracksToPeerConnection = (peerConnection: RTCPeerConnection, stream: MediaStream) => {
    stream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, stream);
    });
  };

  const createOffer = async (appointment: Appointment) => {
    console.log("Creating offer started...");
    if (!localStream) throw new Error("Local stream not initialized. Call startRTC first.");

    const peerConnection = initializePeerConnection(appointment);
    addTracksToPeerConnection(peerConnection, localStream);

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    console.log("Offer created:", offer);
    console.log("Sending offer to patient...");
    socket?.emit(SOCKET_EVENTS.RTC_EVENT, {
      type: "offer",
      offer,
      to: appointment.patient?._id,
      appointment,
    });
    console.log("Offer sent to patient.");

  };

  const createAnswer = useCallback(async (offer: RTCSessionDescriptionInit, appointment: Appointment) => {
    if (!localStream) throw new Error("Local stream not initialized. Call startRTC first.");
    console.log("Creating answer...");
    const peerConnection = initializePeerConnection(appointment);
    addTracksToPeerConnection(peerConnection, localStream);

    await peerConnection.setRemoteDescription(offer);

    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    console.log("Answer created:", answer);
    console.log("Sending answer to doctor...");
    socket?.emit(SOCKET_EVENTS.RTC_EVENT, {
      type: "answer",
      answer,
      to: appointment.doctor?._id,
      appointment,
    });
    console.log("Answer sent to doctor.");

  }, [localStream, initializePeerConnection, socket]);

  // useEffect(() => {
  //   const handleRTCEvent = async (data) => {
  //     const peerConnection = initializePeerConnection(data.appointment);

  //     try {
  //       switch (data.type) {
  //         case "offer": {
  //           await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
  //           await createAnswer(data.offer, data.appointment);
  //           break;
  //         }
  //         case "answer":
  //           await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
  //           break;
  //         case "candidate":
  //           await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
  //           break;
  //         default:
  //           console.warn("Unknown RTC event type:", data.type);
  //       }
  //     } catch (error) {
  //       console.error(`Error handling RTC event (${data.type}):`, error);
  //     }
  //   };

  //   socket?.on(SOCKET_EVENTS.RTC_EVENT, handleRTCEvent);

  //   return () => {
  //     socket?.off(SOCKET_EVENTS.RTC_EVENT, handleRTCEvent);
  //   };
  // }, [socket, initializePeerConnection, createAnswer]);

  return {
    localStream,
    remoteStream,
    startRTC,
    createOffer,
    createAnswer,
    setLocalStream,
    setRemoteStream,
    constraints,
    setConstraints,
    peerConnectionRef,
  };
};

export default useRTC;
