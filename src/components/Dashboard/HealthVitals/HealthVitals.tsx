import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import HealthCard from "./HealthCard";
import { useSelector } from "react-redux";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  CartesianGrid,
} from "recharts";
import Dropdown from "./Dropdown";

interface Activity {
  month: string;
  dayData: Record<string, number>;
}

interface RootState {
  activity: Activity[];
}

const HealthDashboard: React.FC = () => {
  const height = 175;
  const weight = 70;
  const [bmi, setBmi] = useState<number>(0);
  const [status, setStatus] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("January");

  const [bodyMeasurements, setBodyMeasurements] = useState({
    prevChest: 40,
    chest: 42,
    chestTrend: "",
    prevWaist: 30,
    waist: 28,
    waistTrend: "",
    prevHip: 38,
    hip: 40,
    hipTrend: "",
  });

  const setTrend = (prev: number, current: number): string => {
    return prev < current ? "up" : "down";
  };

  // Use useEffect to avoid infinite loop
  useEffect(() => {
    setBodyMeasurements((prevMeasurements) => ({
      ...prevMeasurements,
      chestTrend: setTrend(prevMeasurements.prevChest, prevMeasurements.chest),
      waistTrend: setTrend(prevMeasurements.prevWaist, prevMeasurements.waist),
      hipTrend: setTrend(prevMeasurements.prevHip, prevMeasurements.hip),
    }));
  }, [bodyMeasurements.chest, bodyMeasurements.waist, bodyMeasurements.hip]);

  // BMI calculation moved into useEffect
  useEffect(() => {
    const bmiCalculator = (height: number, weight: number): void => {
      const heightInMeters = height / 100;
      let tempBmi = weight / (heightInMeters * heightInMeters);
      tempBmi = Math.round(tempBmi * 10) / 10;
      setBmi(tempBmi);

      if (tempBmi < 18.5) {
        setStatus("Underweight");
      } else if (tempBmi >= 18.5 && tempBmi <= 24.9) {
        setStatus("Normal");
      } else if (tempBmi >= 25 && tempBmi <= 29.9) {
        setStatus("Overweight");
      } else {
        setStatus("Obese");
      }
    };

    bmiCalculator(height, weight);
  }, [height, weight]);

  // Fetch activity data from Redux store
  const activityData = useSelector((state: RootState) => state.activity);

  const renderLineChart = (): JSX.Element | null => {
    const selectedActivity = activityData.find(
      (activity) => activity.month === selectedMonth
    );
    if (!selectedActivity) {
      return (
        <div className="flex items-center justify-center h-full text-gray-600">
          No data available for {selectedMonth}.
        </div>
      );
    }

    const { dayData } = selectedActivity;

    // Convert dayData object to array of objects for recharts
    const data = Object.keys(dayData).map((day) => ({
      day: parseInt(day),
      value: dayData[day] + 1,
    }));

    return (
      <ResponsiveContainer
        width="100%"
        height={250}
        className={"mouse-pointer"}
      >
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6C48C5" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#6C48C5" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="day" />
          <YAxis tickCount={10} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#6C48C5"
            strokeWidth={1}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  // Handle month selection from dropdown
  const handleMonthSelect = (month: string): void => {
    setSelectedMonth(month);
  };

  return (
    <div className="flex flex-col lg:flex-row h-full bg-[#FFFCF8]">
      {/* <div>
        <button onClick={resetStore} className="bg-red-500 text-white p-2 rounded-lg mt-4 ml-4">Reset Store</button>
      </div> */}
      <div className="flex-1 p-4 lg:p-8 max-w-full">
        <div className="flex justify-between items-center mb-4 lg:mb-8">
          <h1 className="text-xl lg:text-2xl font-bold">Health Overview</h1>
          <div className="flex items-center space-x-4 lg:space-x-6">
            <button className="bg-green-500 text-sm text-white px-4 py-2 rounded-md hover:bg-green-600">
              Update
            </button>
            {/* <Search className="w-5 h-5 text-gray-500 cursor-pointer" /> */}
            <Bell className="w-5 h-5 text-gray-500 cursor-pointer" />
          </div>
        </div>

        <div className="grid place-items-center md:place-items-stretch w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 mb-6 lg:mb-7">
          <HealthCard
            title={"Blood Sugar"}
            value={"75"}
            unit={"mg/dL"}
            status={"Normal"}
          />
          <HealthCard
            title={"Heart Rate"}
            value={"79"}
            unit={"bpm"}
            status={"Normal"}
          />
          <HealthCard
            title={"Blood Pressure"}
            value={"74"}
            unit={"mmHg"}
            status={"Normal"}
          />
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2 lg:mb-4">
            <h2 className="text-lg font-semibold">Activity Growth</h2>
            <button className="flex items-center text-sm text-gray-500">
              <Dropdown
                handleMonthSelect={handleMonthSelect}
                selectedMonth={selectedMonth}
              />
            </button>
          </div>
          <div className="h-48 lg:h-60 w-full bg-gray-100 rounded">
            {renderLineChart()}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="lg:w-80 w-full bg-gray-800 p-4 lg:p-6 text-white flex flex-col space-y-6 h-full overflow-hidden">
        <div className="flex flex-col flex-grow space-y-6">
          {/* BMI Calculator Section */}
          <div className="flex flex-col space-y-4">
            <h2 className="text-lg font-semibold">BMI Calculator</h2>
            <div className="space-y-3">
              <InputField label="Height (cm)" value={height.toString()} />
              <InputField label="Weight (kg)" value={weight.toString()} />
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium">Body Mass Index (BMI)</h3>
              <div className="flex items-center mt-2">
                <span className="text-2xl font-bold">{bmi}</span>
                <span
                  className={`ml-2 text-xs px-2 py-1 rounded ${
                    status === "Underweight"
                      ? "bg-yellow-500"
                      : status === "Normal"
                      ? "bg-green-500"
                      : status === "Overweight"
                      ? "bg-orange-500"
                      : "bg-red-500"
                  }`}
                >
                  {status}
                </span>
              </div>
              <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
                <div
                  className={`h-2 rounded-full ${
                    status === "Underweight"
                      ? "bg-yellow-500"
                      : status === "Normal"
                      ? "bg-green-500"
                      : status === "Overweight"
                      ? "bg-orange-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${(bmi / 40) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Body Measurements Section */}
          <div className="flex-grow overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Body Measurements</h2>
              <p className="text-sm text-gray-400">Last updated 2 Days Ago</p>
            </div>
            <div className="space-y-3">
              <p className="text-sm">Inverted Triangle Body Shape</p>
              <div className="grid grid-rows-3 gap-4">
                <MeasurementField
                  label="Chest (in)"
                  value={bodyMeasurements.chest.toString()}
                  trend={bodyMeasurements.chestTrend}
                />
                <MeasurementField
                  label="Waist (in)"
                  value={bodyMeasurements.waist.toString()}
                  trend={bodyMeasurements.waistTrend}
                />
                <MeasurementField
                  label="Hip (in)"
                  value={bodyMeasurements.hip.toString()}
                  trend={bodyMeasurements.hipTrend}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type InputFieldProps = {
  label: string;
  value: string;
};

function InputField({ label, value }: InputFieldProps) {
  return (
    <div className="bg-gray-700 p-3 rounded">
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        className="bg-transparent text-white w-full"
        readOnly
      />
    </div>
  );
}

type MeasurementFieldProps = {
  label: string;
  value: string;
  trend: string;
};

function MeasurementField({ label, value, trend }: MeasurementFieldProps) {
  return (
    <div className="bg-gray-700 p-3 rounded">
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      <div className="flex items-center">
        <span className="text-lg font-bold">{value}</span>
        <span
          className={`ml-2 ${
            trend === "up" ? "text-green-500" : "text-red-500"
          }`}
        >
          {trend === "up" ? "↑" : "↓"}
        </span>
      </div>
    </div>
  );
}

export default HealthDashboard;
