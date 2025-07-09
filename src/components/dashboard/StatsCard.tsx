import { IconType } from "react-icons";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: IconType;
}

export default function StatsCard({
  title,
  value,
  change,
  icon: Icon,
}: StatsCardProps) {
  const isPositive = change.startsWith("+");

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="p-3 rounded-full bg-amber-100 text-amber-600">
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <div
        className={`mt-2 text-sm ${isPositive ? "text-green-600" : "text-red-600"}`}
      >
        {change} from last month
      </div>
    </div>
  );
}
