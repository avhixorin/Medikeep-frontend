import { SOCKET_EVENTS } from "@/constants/socketEvents";
import {
  cleanUpConnection,
  setLocalStream,
  setPeerConnection,
  setRemoteStream,
} from "@/redux/features/rtcSlice";
import { AppThunk } from "@/redux/store/store";
import { Appointment, User } from "@/types/types";
import { Socket } from "socket.io-client";

export const grabUserMedia = (): AppThunk => async (dispatch, getState) => {
  const { constraints } = getState().rtc;
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    dispatch(setLocalStream(stream));
  } catch (error) {
    console.error("Error accessing media devices:", error);
  }
};

export const createPeerConnection =
  (
    socket: Socket,
    appointment: Appointment,
    user: User
  ): AppThunk<Promise<RTCPeerConnection>> =>
  async (dispatch, getState) => {
    const { localStream, peerConnection, remoteStream } = getState().rtc;

    const servers = {
      iceServers: [
        {
          urls: [
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
          ],
        },
      ],
    };

    if (!localStream) {
      dispatch(grabUserMedia());
    }

    let connection = peerConnection;
    if (!connection) {
      connection = new RTCPeerConnection(servers);
      dispatch(setPeerConnection(connection));

      // Add local tracks
      localStream?.getTracks().forEach((track) => {
        connection?.addTrack(track, localStream);
      });

      // Handle events
      connection.ontrack = (event) => {
        const newRemoteStream = remoteStream || new MediaStream();
        event.streams[0]?.getTracks().forEach((track) => {
          newRemoteStream.addTrack(track);
        });
        dispatch(setRemoteStream(newRemoteStream));
      };

      connection.onicecandidate = (event) => {
        if (event.candidate) {
          socket?.emit(SOCKET_EVENTS.RTC_EVENT, {
            type: "candidate",
            candidate: event.candidate,
            to:
              user?.role === "doctor"
                ? appointment.patient._id
                : appointment.doctor._id,
          });
        }
      };

      connection.onconnectionstatechange = () => {
        if (connection?.connectionState === "disconnected") {
          console.log("Peer connection disconnected.");
          dispatch(cleanUpConnection());
        }
      };
    }

    return connection;
  };

  export const createOffer =
  (socket: Socket, appointment: Appointment, user: User): AppThunk =>
  async (dispatch) => {
    const connection = await dispatch(
      createPeerConnection(socket, appointment, user)
    );

    if (connection instanceof RTCPeerConnection) {
      try {
        const offer = await connection.createOffer();
        await connection.setLocalDescription(offer);

        socket.emit(SOCKET_EVENTS.RTC_EVENT, {
          type: "offer",
          offer,
          to:
            user.role === "doctor"
              ? appointment.patient._id
              : appointment.doctor._id,
        });
      } catch (error) {
        console.error("Failed to create offer:", error);
      }
    } else {
      console.error("Invalid peer connection:", connection);
    }
  };


export const createAnswer =
  (
    socket: Socket,
    offer: RTCSessionDescriptionInit,
    appointment: Appointment,
    user: User
  ): AppThunk =>
  async (dispatch) => {
    const connection = await dispatch(
      createPeerConnection(socket, appointment, user)
    );

    if (connection) {
      await connection.setRemoteDescription(offer);
      const answer = await connection.createAnswer();
      await connection.setLocalDescription(answer);

      socket?.emit(SOCKET_EVENTS.RTC_EVENT, {
        type: "answer",
        answer,
        to: appointment.doctor?._id,
      });
    }
  };
