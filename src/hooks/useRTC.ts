import { useState, useRef, useEffect, useCallback, useMemo } from "react";
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
    async (appointment: Appointment) => {
      console.log("Creating peer connection...");
      const peerConnection = new RTCPeerConnection(servers);
      // Handle remote tracks
      peerConnection.ontrack = (event) => {
        console.log("Remote track received.");
        setRemoteStream((prevStream) => {
          console.log("Remote stream updated.");
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

      // Handle ICE candidates
      peerConnection.onicecandidate = (event) => {
        console.log("ICE candidate event received.");
        if (event.candidate) {
          console.log("Sending ICE candidate...");
          socket?.emit(SOCKET_EVENTS.RTC_EVENT, {
            type: "candidate",
            candidate: event.candidate,
            to:
              user?.role === "doctor"
                ? appointment.patient?._id
                : appointment.doctor?._id,
            appointment,
          });
        }
      };

      peerConnectionRef.current = peerConnection;
      return peerConnectionRef.current;
    },
    [localStream, grabLocalMedia, socket, user, servers]
  );

  const createOffer = async (appointment: Appointment) => {
    console.log("Creating offer started...");
    if (!localStream)
      throw new Error("Local stream not initialized. Call startRTC first.");
    console.log("Local stream available.");
    const peerConnection = await createPeerConnection(appointment);
    if (!peerConnection) {
      console.log("Peer connection not available.");
      return;
    }
    console.log("Peer connection created.");
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

  const createAnswer = useCallback(
    async (offer: RTCSessionDescriptionInit, appointment: Appointment) => {
      try {
        if (!localStream) await grabLocalMedia();
        console.log("Creating answer started...");
        console.log("Creating peer connection...");
        const peerConnection = await createPeerConnection(appointment);
        if (!peerConnection) {
          console.log("Peer connection not available.");
          return;
        }
        console.log("Peer connection created.");
        console.log("Setting remote description for offer...");
        try {
          await peerConnection.setRemoteDescription(offer);
        } catch (error) {
          console.error("Error setting remote description:", error);
        }
        // await peerConnection.setRemoteDescription(offer);
        console.log("Remote description set.");
        console.log("Creating answer...");
        const answer = await peerConnection.createAnswer();
        console.log("Answer created:", answer);
        console.log("Setting local description for answer...");
        await peerConnection.setLocalDescription(answer);

        // Ensure emit is called after setting local description
        if (socket) {
          console.log("Sending answer to doctor...");
          socket.emit(SOCKET_EVENTS.RTC_EVENT, {
            type: "answer",
            answer,
            to: appointment.doctor?._id,
            appointment,
          });
          console.log("Answer sent to doctor.");
        }
      } catch (error) {
        console.error("Error while creating or sending the answer:", error);
      }
    },
    [localStream, grabLocalMedia, createPeerConnection, socket]
  );

  const addAnswer = useCallback(async (answer: RTCSessionDescriptionInit) => {
    try {
      console.log("Adding answer...");
      if (!peerConnectionRef.current?.currentRemoteDescription) {
        await peerConnectionRef.current?.setRemoteDescription(answer);
      }
      console.log("Answer added.");
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
      appointment: Appointment;
    }) => {
      switch (data.type) {
        case "offer":
          console.log("Offer received:", data.offer);
          await createAnswer(data.offer!, data.appointment);
          break;

        case "answer":
          console.log("Answer received:", data.answer);
          await addAnswer(data.answer!);
          break;

        case "candidate":
          console.log("ICE candidate received");
          if (peerConnectionRef.current) {
            try {
              console.log("Adding ICE candidate in component");
              await peerConnectionRef.current.addIceCandidate(data.candidate);
            } catch (error) {
              console.error("Error adding ICE candidate:", error);
            }
          } else {
            console.log("Peer connection not available in component.");
          }
          break;

        default:
          console.log(`Unhandled RTC event type: ${data.type}`);
      }
    };

    socket?.on(SOCKET_EVENTS.RTC_EVENT, handleRTCEvent);

    return () => {
      console.log("Cleaning up RTC_EVENT listener.");
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
