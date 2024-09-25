import { Bell, Search, ChevronDown } from 'lucide-react';

export default function HealthDashboard() {
  return (
    <div className="flex flex-col lg:flex-row h-full bg-gray-100 overflow-y-auto">
      <div className="flex-1 p-4 lg:p-8">
        <div className="flex justify-between items-center mb-4 lg:mb-8">
          <h1 className="text-xl lg:text-2xl font-bold">Health Overview</h1>
          <div className="flex items-center space-x-2 lg:space-x-4">
            <Search className="w-5 h-5 text-gray-500" />
            <Bell className="w-5 h-5 text-gray-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 lg:mb-8">
          <HealthMetric title="Blood Sugar" value={"--"} unit="mg / dL" status="Normal" color="bg-orange-100" />
          <HealthMetric title="Heart Rate" value={"--"} unit="bpm" status="Normal" color="bg-red-100" />
          <HealthMetric title="Blood Pressure" value={"--"} unit="/72 mmHg" status="Normal" color="bg-blue-100" />
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow mb-4 lg:mb-8">
          <div className="flex justify-between items-center mb-2 lg:mb-4">
            <h2 className="text-lg font-semibold">Activity Growth</h2>
            <button className="flex items-center text-sm text-gray-500">
              Jan 2021 <ChevronDown className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="h-48 lg:h-64 bg-gray-100 rounded">
            {/* activity graphs */}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="lg:w-80 w-full lg:h-full bg-gray-800 p-4 lg:p-6 text-white flex flex-col space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">BMI Calculator</h2>
          <div className="space-y-4">
            <InputField label="Height" value={"--"} />
            <InputField label="Weight" value={"--"} />
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Body Mass Index (BMI)</h3>
            <div className="flex items-center">
              <span className="text-3xl font-bold">{"--"}</span>
              <span className="ml-2 text-xs bg-green-500 px-2 py-1 rounded">You're Healthy</span>
            </div>
            <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Body Measurements</h2>
          <p className="text-sm text-gray-400 mb-4">Last checked 2 Days Ago</p>
          <p className="text-sm mb-4">Inverted Triangle Body Shape</p>
          <div className="grid grid-cols-3 gap-4">
            <MeasurementField label="Chest (in)" value={"--"} trend="up" />
            <MeasurementField label="Waist (in)" value={"--"} trend="down" />
            <MeasurementField label="Hip (in)" value={"--"} trend="up" />
          </div>
        </div>
      </div>
    </div>
  );
}

type HealthMetricProps = {
  title: string;
  value: string;
  unit: string;
  status: string;
  color: string;
};

function HealthMetric({ title, value, unit, status, color }: HealthMetricProps) {
  return (
    <div className={`${color} p-4 rounded-lg`}>
      <h3 className="text-sm font-medium mb-2">{title}</h3>
      <div className="flex items-baseline">
        <span className="text-3xl font-bold">{value}</span>
        <span className="ml-1 text-sm text-gray-500">{unit}</span>
      </div>
      <p className="text-sm mt-2">{status}</p>
      <div className="h-12 bg-white rounded mt-2">
        {/* Here comes the chart */}
      </div>
    </div>
  );
}

type InputFieldProps = {
  label: string;
  value: string;
};

function InputField({ label, value }: InputFieldProps) {
  return (
    <div className="bg-gray-700 p-3 rounded">
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      <input type="text" value={value} className="bg-transparent text-white w-full" readOnly />
    </div>
  );
}

type MeasurementFieldProps = {
  label: string;
  value: string;
  trend: 'up' | 'down';
};

function MeasurementField({ label, value, trend }: MeasurementFieldProps) {
  return (
    <div className="bg-gray-700 p-3 rounded">
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      <div className="flex items-center">
        <span className="text-lg font-bold">{value}</span>
        <span className={`ml-2 ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {trend === 'up' ? '↑' : '↓'}
        </span>
      </div>
    </div>
  );
}
