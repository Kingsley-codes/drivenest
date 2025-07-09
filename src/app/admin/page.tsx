"use client";

import Link from "next/link";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { FiCalendar, FiBarChart2, FiShoppingCart, FiTag } from "react-icons/fi";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickActions from "@/components/dashboard/QuickActions";
import VehicleCard from "@/components/dashboard/VehicleCard";
import AdminSidebar from "@/components/AdminSidebar";
import Header from "@/components/dashboard/Header";

ChartJS.register(...registerables);

type ActivityType = "booking" | "purchase" | "test-drive";
type ActivityStatus = "confirmed" | "completed" | "scheduled";

interface Activity {
  id: string | number;
  type: ActivityType;
  vehicle: string;
  date: Date;
  status: ActivityStatus;
}

export default function AdminPage() {
  // Sample data - in a real app, this would come from your API
  const stats = [
    { title: "Total Bookings", value: "24", change: "+12%", icon: FiCalendar },
    {
      title: "Cars for Sale",
      value: "18",
      change: "+5%",
      icon: FiShoppingCart,
    },
    { title: "Active Rentals", value: "7", change: "-2%", icon: FiTag },
    { title: "Revenue", value: "$12,450", change: "+18%", icon: FiBarChart2 },
  ];

  const recentActivities: Activity[] = [
    {
      id: 1,
      type: "booking",
      vehicle: "Tesla Model 3",
      date: new Date(),
      status: "confirmed",
    },
    {
      id: 2,
      type: "purchase",
      vehicle: "Ford Mustang",
      date: new Date(Date.now() - 86400000),
      status: "completed",
    },
    {
      id: 3,
      type: "test-drive",
      vehicle: "BMW X5",
      date: new Date(Date.now() - 172800000),
      status: "scheduled",
    },
  ];

  const featuredVehicles = [
    {
      id: 1,
      name: "Tesla Model S",
      type: "rental" as const, // Add 'as const' to ensure type inference
      price: "$120/day",
      image: "/tesla-model-s.jpg",
    },
    {
      id: 2,
      name: "Jeep Wrangler",
      type: "sale" as const,
      price: "$32,500",
      image: "/jeep-wrangler.jpg",
    },
    {
      id: 3,
      name: "Porsche 911",
      type: "rental" as const,
      price: "$250/day",
      image: "/porsche-911.jpg",
    },
  ];

  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "rgba(251, 191, 36, 0.8)",
      },
      {
        label: "Rentals",
        data: [8, 15, 7, 12, 9, 14],
        backgroundColor: "rgba(16, 185, 129, 0.8)",
      },
    ],
  };

  const vehicleTypesData = {
    labels: ["Sedan", "SUV", "Truck", "Sports"],
    datasets: [
      {
        data: [30, 40, 15, 15],
        backgroundColor: [
          "rgba(251, 191, 36, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(239, 68, 68, 0.8)",
        ],
      },
    ],
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">
              Welcome back! Here's what's happening with your business today.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Sales & Rentals Overview
                </h2>
                <select className="text-sm border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500">
                  <option>Last 6 Months</option>
                  <option>Last Year</option>
                  <option>Last 3 Years</option>
                </select>
              </div>
              <Bar data={salesData} options={{ responsive: true }} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Vehicle Types
              </h2>
              <Pie data={vehicleTypesData} options={{ responsive: true }} />
            </div>
          </div>

          {/* Recent Activity & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <RecentActivity activities={recentActivities} />
            </div>
            <div>
              <QuickActions />
            </div>
          </div>

          {/* Featured Vehicles */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Featured Vehicles
              </h2>
              <Link
                href="/vehicles"
                className="text-sm text-amber-600 hover:text-amber-700 font-medium"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} {...vehicle} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
