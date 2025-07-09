import { format } from "date-fns";
import { FiCalendar, FiShoppingCart, FiRefreshCw } from "react-icons/fi";

type ActivityType = "booking" | "purchase" | "test-drive";
type ActivityStatus = "confirmed" | "completed" | "scheduled";

interface Activity {
  id: string | number;
  type: ActivityType;
  vehicle: string;
  date: Date;
  status: ActivityStatus;
}

interface RecentActivityProps {
  activities: Activity[];
}

const iconMap: Record<
  ActivityType,
  typeof FiCalendar | typeof FiShoppingCart | typeof FiRefreshCw
> = {
  booking: FiCalendar,
  purchase: FiShoppingCart,
  "test-drive": FiRefreshCw,
};

const statusColors: Record<ActivityStatus, string> = {
  confirmed: "bg-green-100 text-green-800",
  completed: "bg-blue-100 text-blue-800",
  scheduled: "bg-amber-100 text-amber-800",
};

export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Recent Activity
      </h2>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = iconMap[activity.type];
          return (
            <div
              key={activity.id}
              className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0"
            >
              <div className="p-2 rounded-full bg-amber-100 text-amber-600 mr-4">
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900 capitalize">
                    {activity.type.replace("-", " ")}: {activity.vehicle}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {format(activity.date, "MMM d, yyyy")}
                  </span>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${statusColors[activity.status]}`}
                >
                  {activity.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4">
        <button className="text-sm text-amber-600 hover:text-amber-700 font-medium">
          View all activity
        </button>
      </div>
    </div>
  );
}
