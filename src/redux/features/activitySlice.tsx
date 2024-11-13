import { activityData } from "@/constants/activityData";
import { Activity, DayData } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Activity[] = activityData;

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    updateActivity: (state, action: PayloadAction<{ month: string; dayData: DayData }>) => {
      const { month, dayData } = action.payload;
      const index = state.findIndex((activity) => activity.month === month);
      if (index !== -1) {
        state[index].dayData = dayData;
      }
    },
    resetActivityState: () => initialState,
  },
});

export const { updateActivity, resetActivityState } = activitySlice.actions;
export default activitySlice.reducer;
