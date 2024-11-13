import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for dayData
type DayData = number[];

interface Activity {
  month: string;
  dayData: DayData; 
}

// Function to generate 10 random data points for each month
const generateRandomDayData = (): DayData => {
  const data: DayData = [];
  for (let i = 0; i < 10; i++) {
    data.push(Math.floor(Math.random() * 100)); // Generate random values between 0 and 100
  }
  return data;
};

const initialState: Activity[] = [
  {
    month: "January",
    dayData: generateRandomDayData(),
  },
  {
    month: "February",
    dayData: generateRandomDayData(),
  },
  {
    month: "March",
    dayData: generateRandomDayData(),
  },
  {
    month: "April",
    dayData: generateRandomDayData(),
  },
  {
    month: "May",
    dayData: generateRandomDayData(),
  },
  {
    month: "June",
    dayData: generateRandomDayData(),
  },
  {
    month: "July",
    dayData: generateRandomDayData(),
  },
  {
    month: "August",
    dayData: generateRandomDayData(),
  },
  {
    month: "September",
    dayData: generateRandomDayData(),
  },
  {
    month: "October",
    dayData: generateRandomDayData(),
  },
  {
    month: "November",
    dayData: generateRandomDayData(),
  },
  {
    month: "December",
    dayData: generateRandomDayData(),
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
    // resetState: () => {
    //   return initialState;  
    // },
  },
});

export const { updateActivity } = activitySlice.actions;
export default activitySlice.reducer;
