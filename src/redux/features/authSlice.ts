import { Appointment, User } from "@/types/types";
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
    setUserTheme: (state, action: PayloadAction<"light" | "dark" | "retro" | "synthwave" | "cyberpunk">) => {
      if (state.user) {
        state.user.theme = action.payload;
      }
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
    removeAppointment: (state, action: PayloadAction<Appointment>) => {
      if (state.user && state.user.appointments) {
        state.user.appointments = state.user.appointments.filter(
          (appointment) => appointment._id !== action.payload._id
        );
      }
    },
    scheduleAppointment: (state, action: PayloadAction<{ appointment: Appointment }>) => {
      if (state.user && state.user.appointments) {
        state.user.appointments = state.user.appointments.map((appointment) => {
          if (appointment._id === action.payload.appointment._id) {
            return { ...appointment, ...action.payload.appointment };
          }
          return appointment;
        });
      }
    },
    reScheduleAppointment: (state, action: PayloadAction<{ appointment: Appointment }>) => {
      if (state.user && state.user.appointments) {
        state.user.appointments = state.user.appointments.map((appointment) => {
          if (appointment._id === action.payload.appointment._id) {
            return { ...appointment, ...action.payload.appointment };
          }
          return appointment;
        });
      }
    },
  },
});

export const {
  setAuthUser,
  setUserTheme,
  clearAuthUser,
  updateUserFields,
  addConnection,
  removeConnection,
  addConnectionRequest,
  removeConnectionRequest,
  addAppointment,
  removeAppointment,
  scheduleAppointment,
  reScheduleAppointment,
} = authSlice.actions;

export default authSlice.reducer;
