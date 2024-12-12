import { useState, useRef } from "react";

const useRTC = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [constraints, setConstraints] = useState<MediaStreamConstraints>({
    audio: true,
    video: true,
  });
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
      // Dynamically use constraints state
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
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

    // Add tracks to the peer connection
    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    // Handle remote tracks
    peerConnection.ontrack = (event) => {
      if (!remoteStream) {
        const newRemoteStream = new MediaStream();
        setRemoteStream(newRemoteStream);
      }
      event.streams[0].getTracks().forEach((track) => {
        setRemoteStream((prevStream) => {
          const updatedStream = prevStream || new MediaStream();
          updatedStream.addTrack(track);
          return updatedStream;
        });
      });
    };

    // Handle ICE candidates
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("ICE Candidate:", event.candidate);
      }
    };

    // Create and set offer
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
    constraints,
    setConstraints, 
  };
};

export default useRTC;
