import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for dayData
type DayData = number[];

interface Activity {
  month: string;
  dayData: DayData; 
}

const generateRandomDayData = (numberOfDays: number): DayData => {
  const data: DayData = [];
  for (let i = 1; i <= numberOfDays; i += 5) {
    data.push(Math.floor(Math.random() * 100));
  }
  return data;
};

const initialState: Activity[] = [
  {
    month: "January",
    dayData: generateRandomDayData(31),
  },
  {
    month: "February",
    dayData: generateRandomDayData(28),
  },
  {
    month: "March",
    dayData: generateRandomDayData(31),
  },
  {
    month: "April",
    dayData: generateRandomDayData(30),
  },
  {
    month: "May",
    dayData: generateRandomDayData(31),
  },
  {
    month: "June",
    dayData: generateRandomDayData(30),
  },
  {
    month: "July",
    dayData: generateRandomDayData(31),
  },
  {
    month: "August",
    dayData: generateRandomDayData(31),
  },
  {
    month: "September",
    dayData: generateRandomDayData(30),
  },
  {
    month: "October",
    dayData: generateRandomDayData(31),
  },
  {
    month: "November",
    dayData: generateRandomDayData(30),
  },
  {
    month: "December",
    dayData: generateRandomDayData(31),
  },
];

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
  },
});

export const { updateActivity } = activitySlice.actions;
export default activitySlice.reducer;
