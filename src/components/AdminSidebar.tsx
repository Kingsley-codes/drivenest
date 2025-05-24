import Link from "next/link";

export default function AdminSidebar() {
  return (
    <div className="flex flex-col w-64 h-screen bg-gray-800 text-white">
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <h1 className="text-lg font-bold">Admin Sidebar</h1>
      </div>
      <nav className="flex flex-col p-4 space-y-2">
        <Link href="/admin" className="hover:bg-gray-700 p-2 rounded">
          Dashboard
        </Link>
        <Link href="/admin/cars" className="hover:bg-gray-700 p-2 rounded">
          Car Management
        </Link>
        <Link href="/admin/sales" className="hover:bg-gray-700 p-2 rounded">
          Sales
        </Link>
        <Link href="/admin/rentals" className="hover:bg-gray-700 p-2 rounded">
          Rentals
        </Link>
        <Link href="/admin/customers" className="hover:bg-gray-700 p-2 rounded">
          Customers
        </Link>
        <Link href="/admin/payments" className="hover:bg-gray-700 p-2 rounded">
          Payments & Invoicing
        </Link>
        <Link href="/admin/reports" className="hover:bg-gray-700 p-2 rounded">
          Reports & Analytics
        </Link>
        <Link href="/admin/settings" className="hover:bg-gray-700 p-2 rounded">
          Admin Settings
        </Link>
        <Link href="/admin/messages " className="hover:bg-gray-700 p-2 rounded">
          Messages / Support
        </Link>
      </nav>
    </div>
  );
}
