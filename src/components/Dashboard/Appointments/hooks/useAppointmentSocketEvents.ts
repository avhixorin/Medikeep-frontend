import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { useSocket } from "@/sockets/context";
import { SOCKET_EVENTS } from "@/constants/socketEvents";
import type { Appointment } from "@/types/types";

type AppointmentEventPayload = {
  statusCode: number;
  message: string;
  data: Appointment;
};
const isSuccess = (status?: number): boolean =>
  typeof status === "number" && status >= 200 && status < 300;

import {
  addAppointment,
  addAppointmentRequest,
  removeAppointment,
  removeAppointmentRequest,
  reScheduleAppointment,
} from "@/redux/features/authSlice";

/**
 * A custom hook to manage all socket events related to appointments.
 */
export const useAppointmentSocketEvents = () => {
  const { socket } = useSocket();
  const dispatch = useDispatch();

  // Handles the response after the current user requests an appointment
  const handleAppointmentRequestResponse = useCallback(
    (payload: AppointmentEventPayload) => {
      if (isSuccess(payload.statusCode)) {
        toast.success(payload.message);
        dispatch(addAppointmentRequest(payload.data));
      } else {
        toast.error(payload.message);
      }
    },
    [dispatch]
  );

  const handleNewAppointmentRequest = useCallback(
    (payload: AppointmentEventPayload) => {
      if (isSuccess(payload.statusCode)) {
        toast.success(payload.message);
        dispatch(addAppointmentRequest(payload.data));
      } else {
        toast.error(payload.message);
      }
    },
    [dispatch]
  );

  // Handles the confirmation that an appointment was accepted
  const handleAppointmentAcception = useCallback(
    (payload: AppointmentEventPayload) => {
      if (isSuccess(payload.statusCode)) {
        toast.success(payload.message);
        dispatch(removeAppointmentRequest(payload.data._id));
        dispatch(addAppointment(payload.data));
      } else {
        toast.error(payload.message);
      }
    },
    [dispatch]
  );

  // Handles the confirmation that an appointment was rejected
  const handleAppointmentRequestRejection = useCallback(
    (payload: AppointmentEventPayload) => {
      if (isSuccess(payload.statusCode)) {
        toast.success(payload.message);
        dispatch(removeAppointmentRequest(payload.data._id));
      } else {
        toast.error(payload.message);
      }
    },
    [dispatch]
  );

  // Handles the confirmation that an appointment was rescheduled
  const handleAppointmentRescheduling = useCallback(
    (payload: AppointmentEventPayload) => {
      if (isSuccess(payload.statusCode)) {
        toast.success(payload.message);
        dispatch(reScheduleAppointment(payload.data));
      } else {
        toast.error(payload.message);
      }
    },
    [dispatch]
  );

  // Handles the confirmation that an appointment was cancelled
  const handleAppointmentCancellation = useCallback(
    (payload: AppointmentEventPayload) => {
      if (isSuccess(payload.statusCode)) {
        dispatch(removeAppointment(payload.data._id));
      } else {
        toast.error(payload.message);
      }
    },
    [dispatch]
  );

  // Handles the confirmation that an appointment was marked as completed
  const handleAppointmentCompletion = useCallback(
    (payload: AppointmentEventPayload) => {
      if (isSuccess(payload.statusCode)) {
        toast.success(payload.message);
        dispatch(removeAppointment(payload.data._id));
      } else {
        toast.error(payload.message);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (!socket) return;

    // A map of event names to their corresponding handlers for clean registration
    const appointmentListeners = {
      [SOCKET_EVENTS.REQUEST_APPOINTMENT_RESPONSE]:
        handleAppointmentRequestResponse,
      [SOCKET_EVENTS.NEW_APPOINTMENT_REQUEST]: handleNewAppointmentRequest,
      [SOCKET_EVENTS.ACCEPT_APPOINTMENT]: handleAppointmentAcception,
      [SOCKET_EVENTS.DECLINE_APPOINTMENT_REQUEST]:
        handleAppointmentRequestRejection,
      [SOCKET_EVENTS.RESCHEDULED_APPOINTMENT]: handleAppointmentRescheduling,
      [SOCKET_EVENTS.CANCELLED_APPOINTMENT]: handleAppointmentCancellation,
      [SOCKET_EVENTS.COMPLETED_APPOINTMENT]: handleAppointmentCompletion,
    };

    // Register all listeners
    Object.entries(appointmentListeners).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    // Cleanup: Unregister all listeners when the component unmounts
    return () => {
      Object.entries(appointmentListeners).forEach(([event, handler]) => {
        socket.off(event, handler);
      });
    };
  }, [
    socket,
    handleAppointmentRequestResponse,
    handleNewAppointmentRequest,
    handleAppointmentAcception,
    handleAppointmentRequestRejection,
    handleAppointmentRescheduling,
    handleAppointmentCancellation,
    handleAppointmentCompletion,
  ]);
};
