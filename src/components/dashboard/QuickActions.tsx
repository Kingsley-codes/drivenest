import Link from "next/link";
import { FiPlus, FiCalendar, FiDollarSign, FiFileText } from "react-icons/fi";

interface QuickAction {
  title: string;
  href: string;
  icon: React.ReactNode;
  color: string;
}

export default function QuickActions() {
  const actions: QuickAction[] = [
    {
      title: "Add New Vehicle",
      href: "/vehicles/add",
      icon: <FiPlus className="w-5 h-5" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Schedule Test Drive",
      href: "/test-drives/schedule",
      icon: <FiCalendar className="w-5 h-5" />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Process Payment",
      href: "/payments",
      icon: <FiDollarSign className="w-5 h-5" />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Generate Report",
      href: "/reports",
      icon: <FiFileText className="w-5 h-5" />,
      color: "bg-amber-100 text-amber-600",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Quick Actions
      </h2>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className={`p-2 rounded-full mr-3 ${action.color}`}>
              {action.icon}
            </div>
            <span className="font-medium text-gray-700">{action.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
