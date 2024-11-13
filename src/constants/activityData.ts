import { DayData } from "@/types/types";

const generateRandomDayData = (): DayData => {
    const data: DayData = [];
    for (let i = 0; i < 10; i++) {
      data.push(Math.floor(Math.random() * 100));
    }
    return data;
  };

export const activityData = [
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