import { useState } from "react";

const useRTC = () => {
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    let [peerConnection] = useState<RTCPeerConnection | null>(null);

    const startRTC = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
    };
    const servers = {
        iceServers:[
        {
        urls: ['stun:stun1.1.google.com:19302', 'stun:stun2.1.google.com:19302']
        }
        ]}

    const createOffer = async () => {
        peerConnection = new RTCPeerConnection(servers);

        localStream?.getTracks().forEach((track) => {
            peerConnection?.addTrack(track, localStream);
        });

        peerConnection.ontrack = (event) => {
            event.streams[0].getTracks().forEach((track) => {
                remoteStream?.addTrack(track);
            });
        };

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                console.log(event.candidate);
            }
        };

        const offer = await peerConnection.createOffer();
        peerConnection.setLocalDescription(offer);
        return offer;
    }

    return { localStream, remoteStream, startRTC, setRemoteStream, setLocalStream, createOffer };
};

export default useRTC;