import { Bell, Search, ChevronDown } from 'lucide-react';

export default function HealthDashboard() {
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      <div className="flex-1 p-4 lg:p-8">
        <div className="flex justify-between items-center mb-4 lg:mb-8">
          <h1 className="text-xl lg:text-2xl font-bold">Health Overview</h1>
          <div className="flex items-center space-x-2 lg:space-x-4">
            <Search className="w-5 h-5 text-gray-500" />
            <Bell className="w-5 h-5 text-gray-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 lg:mb-8">
          <HealthMetric title="Blood Sugar" value="80" unit="mg / dL" status="Normal" color="bg-orange-100" />
          <HealthMetric title="Heart Rate" value="98" unit="bpm" status="Normal" color="bg-red-100" />
          <HealthMetric title="Blood Pressure" value="102" unit="/72 mmHg" status="Normal" color="bg-blue-100" />
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow mb-4 lg:mb-8">
          <div className="flex justify-between items-center mb-2 lg:mb-4">
            <h2 className="text-lg font-semibold">Activity Growth</h2>
            <button className="flex items-center text-sm text-gray-500">
              Jan 2021 <ChevronDown className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="h-48 lg:h-64 bg-gray-100 rounded">
            {/* Placeholder for the activity chart */}
          </div>
        </div>

        {/* Upcoming Appointment */}
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Upcoming Appointment</h2>
          <div className="flex items-center">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">August 14, 2021</span>
            <span className="ml-2 text-sm text-gray-500">Consultation with Dr. James</span>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="lg:w-80 w-full lg:h-full bg-gray-800 p-4 lg:p-6 text-white flex flex-col space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">BMI Calculator</h2>
          <div className="space-y-4">
            <InputField label="Height" value="170 cm" />
            <InputField label="Weight" value="72 kg" />
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Body Mass Index (BMI)</h3>
            <div className="flex items-center">
              <span className="text-3xl font-bold">24.9</span>
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
            <MeasurementField label="Chest (in)" value="44.5" trend="up" />
            <MeasurementField label="Waist (in)" value="34" trend="down" />
            <MeasurementField label="Hip (in)" value="42.5" trend="up" />
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
        {/* Placeholder for the chart */}
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
