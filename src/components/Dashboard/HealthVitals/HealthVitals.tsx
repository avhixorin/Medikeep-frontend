import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import HealthCard from "./HealthCard";
import { ActivityChart } from "./ActivityChart";

const HealthDashboard: React.FC = () => {
  const height = 175;
  const weight = 70;
  const [bmi, setBmi] = useState<number>(0);
  const [status, setStatus] = useState<string>("");

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

  useEffect(() => {
    setBodyMeasurements((prevMeasurements) => ({
      ...prevMeasurements,
      chestTrend: setTrend(prevMeasurements.prevChest, prevMeasurements.chest),
      waistTrend: setTrend(prevMeasurements.prevWaist, prevMeasurements.waist),
      hipTrend: setTrend(prevMeasurements.prevHip, prevMeasurements.hip),
    }));
  }, [bodyMeasurements.chest, bodyMeasurements.waist, bodyMeasurements.hip]);

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

  return (
    <div className="flex flex-col lg:flex-row h-full bg-[#FFFCF8] dark:bg-[#141414]">
      <div className="flex flex-col w-full h-full justify-evenly items-center px-4">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-xl lg:text-2xl font-bold">Health Overview</h1>
          <div className="flex items-center space-x-4 lg:space-x-6">
            <button className="bg-green-500 dark:bg-green-700 text-sm text-white px-4 py-2 rounded-md hover:bg-green-600">
              Update
            </button>
            <Bell className="w-5 h-5 text-gray-500 cursor-pointer dark:text-gray-200" />
          </div>
        </div>

        <div className="flex w-full justify-between items-center gap-4">
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

        <div className="rounded-lg shadow w-full">
            <ActivityChart />
        </div>
      </div>
      <div className="lg:w-80 w-full bg-gray-800 dark:bg-gray-950 p-4 lg:p-6 text-white flex flex-col space-y-6 h-full">
        <div className="flex flex-col flex-grow space-y-6">
          <div className="flex flex-col space-y-4">
            <h2 className="text-lg font-semibold">BMI Calculator</h2>
            <div className="space-y-2">
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

          <div className="flex-grow overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Body Measurements</h2>
            </div>
            <div className="space-y-1">
              <div className="grid grid-rows-3 gap-2">
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
