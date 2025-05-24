import Link from "next/link";

export default function carsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Car Management</h1>
      <p className="text-gray-600">Manage your car inventory here.</p>
      <div className="flex flex-col items-center mt-4">
        <Link
          href="/admin/cars/add"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Car
        </Link>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-2">
          View All Cars
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-2">
          Delete Car
        </button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mt-2">
          Update Car
        </button>
        <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 mt-2">
          View Car Details
        </button>
      </div>
    </div>
  );
}
