import Link from "next/link";
import {
  FiHome,
  FiShoppingCart,
  FiCalendar,
  FiUser,
  FiFileText,
  FiSettings,
  FiMessageSquare,
  FiTrendingUp,
  FiCreditCard,
} from "react-icons/fi";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  current: boolean;
}

export default function Sidebar() {
  const navItems: NavItem[] = [
    { name: "Dashboard", href: "/admin", icon: FiHome, current: true },
    {
      name: "Vehicles",
      href: "/admin/cars",
      icon: FiShoppingCart,
      current: false,
    },
    {
      name: "Sales",
      href: "/admin/sales",
      icon: FiTrendingUp, // More appropriate for sales
      current: false,
    },
    {
      name: "Bookings",
      href: "/admin/rentals",
      icon: FiCalendar,
      current: false,
    },
    {
      name: "Customers",
      href: "/admin/customers",
      icon: FiUser,
      current: false,
    },
    {
      name: "Reports",
      href: "/admin/reports",
      icon: FiFileText,
      current: false,
    },
    {
      name: "Payments & Invoicing",
      href: "/admin/payments",
      icon: FiCreditCard, // More specific for payments
      current: false,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: FiSettings,
      current: false,
    },
    {
      name: "Messages / Support",
      href: "/admin/messages",
      icon: FiMessageSquare, // Better for messages
      current: false,
    },
  ];

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
        <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-amber-600">AutoRentals</h1>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  item.current
                    ? "bg-amber-50 text-amber-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
              >
                <item.icon
                  className={`${
                    item.current
                      ? "text-amber-500"
                      : "text-gray-400 group-hover:text-gray-500"
                  } mr-3 flex-shrink-0 h-6 w-6`}
                />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <div className="flex items-center">
            <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center">
              <FiUser className="h-5 w-5 text-gray-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">John Doe</p>
              <Link
                href="/profile"
                className="text-xs font-medium text-amber-600 hover:text-amber-700"
              >
                View profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
