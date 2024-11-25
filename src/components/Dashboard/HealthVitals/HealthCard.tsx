import { ResponsiveContainer, Area, AreaChart } from 'recharts';

const data = [
  { value: 70 },
  { value: 75 },
  { value: 79 },
  { value: 74 },
  { value: 80 },
  { value: 74 },
  { value: 78 },
  { value: 80 },
];

interface HealthcardProps {
  title: string;
  value: string;
  unit: string;
  status: string;
}

export default function HealthCard({ title, value, unit, status }: HealthcardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full lg:w-[19rem]">
      <div className="flex items-center mb-2">
        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-orange-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
          </svg>
        </div>
        <span className="text-gray-600 font-medium">{title}</span>
      </div>
      <div className="mb-2">
        <span className="text-3xl font-bold">{value}</span>
        <span className="text-gray-500 ml-1">{unit}</span>
      </div>
      <div className="text-green-500 font-medium mb-4">{status}</div>
      <div className="h-16">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke="#f97316"
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
