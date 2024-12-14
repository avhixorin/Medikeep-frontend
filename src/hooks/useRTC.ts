import { useState, useRef } from "react";
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

  const servers = {
      iceServers: [
        {
          urls: [
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
          ],
        },
      ],
    }

  const grabLocalMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setLocalStream(stream);
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };
  const createPeerConnection = 
    async (appointment: Appointment) => {
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

        if (!localStream) {
          await grabLocalMedia();
        }

        localStream?.getTracks().forEach((track) => {
          peerConnection.addTrack(track, localStream);
        });

        // Handle ICE candidates
        peerConnection.onicecandidate = (event) => {
          if (event.candidate) {
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
      }
      return peerConnectionRef.current;
    }

  const createOffer = async (appointment: Appointment) => {
    console.log("Creating offer started...");
    if (!localStream)
      throw new Error("Local stream not initialized. Call startRTC first.");

    const peerConnection = await createPeerConnection(appointment);
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

  const createAnswer = async (
    offer: RTCSessionDescriptionInit,
    appointment: Appointment
  ) => {
    try {
      if (!localStream) await grabLocalMedia();
      console.log("Creating answer started...");
      const peerConnection = await createPeerConnection(appointment);
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
  };

  const addAnswer = async (answer: RTCSessionDescriptionInit) => {
    try {
      console.log("Adding answer...");
      if (!peerConnectionRef.current?.currentRemoteDescription) {
        await peerConnectionRef.current?.setRemoteDescription(answer);
      }
      console.log("Answer added.");
    } catch (error) {
      console.error("Error adding answer:", error);
    }
  };

  const closePeerConnection = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
  };

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
    closePeerConnection,
  };
};

export default useRTC;
