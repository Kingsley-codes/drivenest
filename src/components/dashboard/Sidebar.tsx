import Link from "next/link";
import { FaCarAlt } from "react-icons/fa";
import {
  FiUser,
  FiCreditCard,
  FiStar,
  FiDollarSign,
  FiClock,
  FiSettings,
  FiMessageSquare,
} from "react-icons/fi";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export default function Sidebar() {
  // Sample user data - would come from your API
  const user = {
    name: "Alex Johnson",
    membership: "Gold Member",
    activeRentals: 1,
    ownedVehicles: 2,
    upcomingPayments: 1,
  };

  const navItems: NavItem[] = [
    { name: "My Profile", href: "/user/profile", icon: FiUser },
    {
      name: "My Vehicles",
      href: "/user/vehicles",
      icon: FaCarAlt,
      badge: `${user.ownedVehicles} owned`,
    },
    {
      name: "Current Rentals",
      href: "/user/rentals",
      icon: FiClock,
      badge: `${user.activeRentals} active`,
    },
    {
      name: "Payment History",
      href: "/user/payments",
      icon: FiCreditCard,
    },
    {
      name: "Upcoming Payments",
      href: "/user/payments/upcoming",
      icon: FiDollarSign,
      badge:
        user.upcomingPayments > 0 ? `${user.upcomingPayments} due` : undefined,
    },
    { name: "Leave a Review", href: "/user/reviews/new", icon: FiStar },
    { name: "My Reviews", href: "/user/reviews", icon: FiStar },
    { name: "Support", href: "/user/support", icon: FiMessageSquare },
    { name: "Settings", href: "/user/settings", icon: FiSettings },
  ];

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
        <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-amber-600">My Account</h1>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex justify-between items-center px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
              >
                <div className="flex items-center">
                  <item.icon className="mr-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                  {item.name}
                </div>
                {item.badge && (
                  <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <div className="flex items-center">
            <div className="h-9 w-9 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
              <FiUser className="h-5 w-5" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{user.name}</p>
              <p className="text-xs text-amber-600">{user.membership}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
