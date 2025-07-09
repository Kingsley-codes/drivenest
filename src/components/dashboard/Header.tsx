import Link from "next/link";
import { FiBell, FiSearch } from "react-icons/fi";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center md:hidden">
              {/* Mobile menu button would go here */}
            </div>
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
              {/* Navigation for larger screens */}
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/admin/cars/add">
                <button
                  type="button"
                  className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                >
                  Add New Vehicle
                </button>
              </Link>
            </div>
            <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
              <button
                type="button"
                className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                <span className="sr-only">View notifications</span>
                <FiBell className="h-6 w-6" />
              </button>

              {/* Profile dropdown would go here */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
