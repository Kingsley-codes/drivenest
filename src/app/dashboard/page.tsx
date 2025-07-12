import Sidebar from "@/components/dashboard/Sidebar";
import Link from "next/link";
import { FaCarAlt } from "react-icons/fa";
import {
  FiStar,
  FiMessageSquare,
  FiAlertCircle,
  FiClock,
} from "react-icons/fi";

export default function UserDashboard() {
  // Sample user data - would come from your API
  const user = {
    name: "Alex Johnson",
    membership: "Gold Member",
    activeRentals: 1,
    ownedVehicles: 2,
    upcomingPayments: 1,
  };

  // Sample active rental - would come from your API
  const activeRental = {
    vehicle: "2023 Mercedes-Benz S-Class",
    startDate: "2023-06-15",
    endDate: "2023-07-15",
    dailyRate: "$249",
    totalDue: "$3,237",
    daysRemaining: 7,
    image: "/mercedes-s-class.jpg",
  };

  // Sample owned vehicle - would come from your API
  const ownedVehicle = {
    model: "2022 Porsche 911 Turbo S",
    purchaseDate: "2022-09-10",
    warrantyUntil: "2025-09-10",
    nextService: "2023-12-01",
    image: "/porsche-911.jpg",
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user.name.split(" ")[0]}!
          </h1>
          <p className="text-gray-600">
            Here&apos;s your current activity and vehicles
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-green-100 text-green-600 mr-3">
                  <FaCarAlt className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Owned Vehicles
                  </p>
                  <p className="text-xl font-semibold">{user.ownedVehicles}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                  <FiClock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Active Rentals
                  </p>
                  <p className="text-xl font-semibold">{user.activeRentals}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-amber-100 text-amber-600 mr-3">
                  <FiAlertCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Upcoming Payments
                  </p>
                  <p className="text-xl font-semibold">
                    {user.upcomingPayments}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Current Rental Section */}
          {user.activeRentals > 0 && (
            <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Current Rental
                </h2>
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 mb-4 md:mb-0">
                    <div className="h-48 bg-gray-200 rounded-lg overflow-hidden">
                      <div className="h-full flex items-center justify-center text-gray-400">
                        Vehicle Image
                      </div>
                    </div>
                  </div>
                  <div className="md:w-2/3 md:pl-6">
                    <h3 className="text-xl font-bold text-gray-900">
                      {activeRental.vehicle}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-gray-500">Rental Period</p>
                        <p className="font-medium">
                          {activeRental.startDate} to {activeRental.endDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Daily Rate</p>
                        <p className="font-medium">{activeRental.dailyRate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Days Remaining</p>
                        <p className="font-medium">
                          {activeRental.daysRemaining} days
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Due</p>
                        <p className="font-medium">{activeRental.totalDue}</p>
                      </div>
                    </div>
                    <div className="mt-6 flex space-x-3">
                      <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Extend Rental
                      </button>
                      <button className="px-4 py-2 bg-amber-600 text-white rounded-md text-sm font-medium hover:bg-amber-700">
                        Make Payment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Owned Vehicles Section */}
          {user.ownedVehicles > 0 && (
            <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Your Vehicles
                </h2>
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 mb-4 md:mb-0">
                    <div className="h-48 bg-gray-200 rounded-lg overflow-hidden">
                      <div className="h-full flex items-center justify-center text-gray-400">
                        Vehicle Image
                      </div>
                    </div>
                  </div>
                  <div className="md:w-2/3 md:pl-6">
                    <h3 className="text-xl font-bold text-gray-900">
                      {ownedVehicle.model}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-gray-500">Purchase Date</p>
                        <p className="font-medium">
                          {ownedVehicle.purchaseDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Warranty Until</p>
                        <p className="font-medium">
                          {ownedVehicle.warrantyUntil}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Next Service</p>
                        <p className="font-medium">
                          {ownedVehicle.nextService}
                        </p>
                      </div>
                      <div className="flex items-end">
                        <button className="px-4 py-2 bg-amber-600 text-white rounded-md text-sm font-medium hover:bg-amber-700">
                          Schedule Service
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/vehicles"
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                  <FaCarAlt className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-gray-900">Browse Vehicles</h3>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Explore our latest luxury and regular vehicles
              </p>
            </Link>
            <Link
              href="/user/reviews/new"
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-amber-100 text-amber-600 mr-4">
                  <FiStar className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-gray-900">Leave a Review</h3>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Share your experience with your recent purchase or rental
              </p>
            </Link>
            <Link
              href="/user/support"
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                  <FiMessageSquare className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-gray-900">Get Support</h3>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Need help? Contact our customer support team
              </p>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
