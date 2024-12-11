import { useState, useRef } from "react";

const useRTC = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

  const servers = {
    iceServers: [
      {
        urls: ["stun:stun1.1.google.com:19302", "stun:stun2.1.google.com:19302"],
      },
    ],
  };

  const startRTC = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const createOffer = async () => {
    if (!localStream) {
      throw new Error("Local stream not initialized. Call startRTC first.");
    }

    if (!peerConnectionRef.current) {
      peerConnectionRef.current = new RTCPeerConnection(servers);
    }

    const peerConnection = peerConnectionRef.current;

    // Add local stream tracks to the connection
    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    // Handle remote stream
    peerConnection.ontrack = (event) => {
      if (!remoteStream) {
        const newRemoteStream = new MediaStream();
        setRemoteStream(newRemoteStream);
      }
      event.streams[0].getTracks().forEach((track) => {
        remoteStream?.addTrack(track);
      });
    };

    // Handle ICE candidates
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("ICE Candidate:", event.candidate);
      }
    };

    // Create and set local offer
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    return offer;
  };

  return {
    localStream,
    remoteStream,
    startRTC,
    createOffer,
    setRemoteStream,
    setLocalStream,
  };
};

export default useRTC;