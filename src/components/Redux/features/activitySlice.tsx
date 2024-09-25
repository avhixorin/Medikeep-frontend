import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Activity {
  month: string;
  dayData: object;
}

// Function to generate random day data for every 5 days
const generateRandomDayData = (numberOfDays: number): object => {
  const data = {};
  for (let i = 1; i <= numberOfDays; i += 5) {
    data[i] = Math.floor(Math.random() * 100);
  }
  return data;
};

const initialState: Activity[] = [
  {
    month: "January",
    dayData: generateRandomDayData(31), // Adjusted for every 5 days
  },
  {
    month: "February",
    dayData: generateRandomDayData(28), // Adjusted for every 5 days
  },
  {
    month: "March",
    dayData: generateRandomDayData(31), // Adjusted for every 5 days
  },
  {
    month: "April",
    dayData: generateRandomDayData(30), // Adjusted for every 5 days
  },
  {
    month: "May",
    dayData: generateRandomDayData(31), // Adjusted for every 5 days
  },
  {
    month: "June",
    dayData: generateRandomDayData(30), // Adjusted for every 5 days
  },
  {
    month: "July",
    dayData: generateRandomDayData(31), // Adjusted for every 5 days
  },
  {
    month: "August",
    dayData: generateRandomDayData(31), // Adjusted for every 5 days
  },
  {
    month: "September",
    dayData: generateRandomDayData(30), // Adjusted for every 5 days
  },
  {
    month: "October",
    dayData: generateRandomDayData(31), // Adjusted for every 5 days
  },
  {
    month: "November",
    dayData: generateRandomDayData(30), // Adjusted for every 5 days
  },
  {
    month: "December",
    dayData: generateRandomDayData(31), // Adjusted for every 5 days
  },
];

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    updateActivity: (state, action: PayloadAction<{ month: string; dayData: object }>) => {
      const { month, dayData } = action.payload;
      const index = state.findIndex((activity) => activity.month === month);
      if (index !== -1) {
        state[index].dayData = dayData;
      }
    },
  },
});

export const { updateActivity } = activitySlice.actions;
export default activitySlice.reducer;
