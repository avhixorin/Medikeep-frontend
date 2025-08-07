import { Appointment, User } from "../../types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearAuthUser: (state) => {
      state.user = null;
    },
    updateUserFields: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    addConnection: (state, action: PayloadAction<User>) => {
      if (state.user) {
        state.user.connections = state.user.connections || [];
        state.user.connections.push(action.payload);
      }
    },
    setUserConnections: (state, action: PayloadAction<User[]>) => {
      if (state.user) {
        state.user.connections = action.payload;
      }
    },
    setUserConnectionRequests: (state, action: PayloadAction<User[]>) => {
      if (state.user) {
        state.user.connectionRequests = action.payload;
      }
    },
    removeConnection: (state, action: PayloadAction<string>) => {
      if (state.user && state.user.connections) {
        state.user.connections = state.user.connections.filter(
          (connection) => connection._id !== action.payload
        );
      }
    },
    addConnectionRequest: (state, action: PayloadAction<User>) => {
      if (state.user) {
        state.user.connectionRequests = state.user.connectionRequests || [];
        state.user.connectionRequests.push(action.payload);
      }
    },
    removeConnectionRequest: (state, action: PayloadAction<string>) => {
      if (state.user && state.user.connectionRequests) {
        state.user.connectionRequests = state.user.connectionRequests.filter(
          (request) => request._id !== action.payload
        );
      }
    },
    addAppointment: (state, action: PayloadAction<Appointment>) => {
      if (state.user) {
        state.user.appointments = state.user.appointments || [];
        state.user.appointments.push(action.payload);
      }
    },
    addAppointmentRequest: (state, action: PayloadAction<Appointment>) => {
      if (state.user) {
        state.user.appointmentRequests = state.user.appointmentRequests || [];
        state.user.appointmentRequests.push(action.payload);
      }
    },
    setUserAppointmentRequests: (state, action: PayloadAction<Appointment[]>) => {
      if (state.user) {
        state.user.appointmentRequests = action.payload;
      }
    },
    removeAppointment: (state, action: PayloadAction<string>) => {
      if (state.user && state.user.appointments) {
        state.user.appointments = state.user.appointments.filter(
          (appointment) => appointment._id !== action.payload
        );
      }
    },
    removeAppointmentRequest: (state, action: PayloadAction<string>) => {
      if (state.user && state.user.appointmentRequests) {
        state.user.appointmentRequests = state.user.appointmentRequests.filter(
          (request) => request._id !== action.payload
        );
      }
    },
    reScheduleAppointment: (state, action: PayloadAction<Appointment>) => {
      if (state.user && state.user.appointments) {
        state.user.appointments = state.user.appointments.map((appointment) => {
          if (appointment._id === action.payload._id) {
            return { ...appointment, ...action.payload };
          }
          return appointment;
        });
      }
    },
    updateGeneralSettings: (
      state,
      action: PayloadAction<{
        key: "theme" | "language" | "accountPrivacy";
        value: string;
      }>
    ) => {
      const { key, value } = action.payload;
      if (
        state.user &&
        state.user.settingPreferences &&
        state.user.settingPreferences.general
      ) {
        state.user.settingPreferences.general[key] = value;
      }
    },
    updateSecuritySettings: (
      state,
      action: PayloadAction<{
        key: "twoFactorAuth" | "isAccountActive";
        value: boolean;
      }>
    ) => {
      const { key, value } = action.payload;
      if (
        state.user &&
        state.user.settingPreferences &&
        state.user.settingPreferences.security
      ) {
        state.user.settingPreferences.security[key] = value;
      }
    },
    updateNotificationSettings: (
      state,
      action: PayloadAction<{
        key:
          | "isEnabled"
          | "emailNotifications"
          | "pushNotifications"
          | "smsNotifications"
          | "promotionalEmails"
          | "notificationSound"
          | "weeklyDigest";
        value: boolean;
      }>
    ) => {
      const { key, value } = action.payload;
      if (
        state.user &&
        state.user.settingPreferences &&
        state.user.settingPreferences.notifications
      ) {
        state.user.settingPreferences.notifications[key] = value;
      }
    },
    setUserAppointments: (state, action: PayloadAction<Appointment[]>) => {
      console.log("Setting user appointments");
      if (state.user) {
        state.user.appointments = action.payload;
      }
    },
    // setUserAppointmentRequests: (state, action: PayloadAction<AppointmentRequests[]>) => {
    //   if (state.user) {
    //     state.user.appointmentRequests = action.payload;
    //   }
    // },
  },
});

export const {
  setAuthUser,
  clearAuthUser,
  updateUserFields,
  setUserConnections,
  setUserConnectionRequests,
  addConnection,
  removeConnection,
  addConnectionRequest,
  removeConnectionRequest,
  addAppointment,
  removeAppointment,
  setUserAppointmentRequests,
  addAppointmentRequest,
  removeAppointmentRequest,
  reScheduleAppointment,
  updateGeneralSettings,
  updateSecuritySettings,
  updateNotificationSettings,
  setUserAppointments,
} = authSlice.actions;

export default authSlice.reducer;
