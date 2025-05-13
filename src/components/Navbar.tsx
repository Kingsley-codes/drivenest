"use client";

import Link from "next/link";
import { GiCancel } from "react-icons/gi";
import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuOpen &&
        !(event.target as Element).closest(".mobile-menu-container")
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <nav className="bg-gray-950 shadow">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 py-4 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex items-center">
            {/* Mobile menu button */}
            <div className="sm:hidden mr-3">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white focus:outline-none"
              >
                <FaBars className="block cursor-pointer golden h-6 w-6 m-2" />
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-4xl font-pt-serif font-bold">
                <span className="golden">Drive</span>
                <span className="text-white">Nest</span>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation (hidden on mobile) */}
          <div className="hidden sm:block">
            <ul className="flex text-xl space-x-4">
              <li className="px-3 py-2 text-white hover:bg-gray-700 rounded-md">
                <Link href="/">Home</Link>
              </li>
              <li className="px-3 py-2 text-white hover:bg-gray-700 rounded-md">
                <Link href="/collections">Garage</Link>
              </li>
              <li className="px-3 py-2 text-white hover:bg-gray-700 rounded-md">
                <Link href="/rentals">Rent a Car</Link>
              </li>
              <li className="px-3 py-2 text-white hover:bg-gray-700 rounded-md">
                <Link href="/sales">Buy a Car</Link>
              </li>
              <li className="px-3 py-2 text-white hover:bg-gray-700 rounded-md">
                <Link href="/contact">Contact</Link>
              </li>
              <li className="px-3 py-2 text-white hover:bg-gray-700 rounded-md">
                <Link href="/about">About</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile menu (show/hide based on menu state) */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden">
          <div className="mobile-menu-container absolute top-0 left-0 h-full w-3/4 bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col">
              {/* Close button at the top right of mobile menu */}
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 golden m-2 rounded-md hover:bg-gray-800 cursor-pointer focus:outline-none"
                >
                  <GiCancel className="h-6 w-6" />
                </button>
              </div>

              {/* Mobile menu links */}
              <Link
                href="/collections"
                className="block px-3 py-2 text-white hover:bg-gray-700 rounded-md"
                onClick={() => setMenuOpen(false)}
              >
                Garage
              </Link>
              <Link
                href="/rentals"
                className="block px-3 py-2 text-white hover:bg-gray-700 rounded-md"
                onClick={() => setMenuOpen(false)}
              >
                Rent a Car
              </Link>
              <Link
                href="/sales"
                className="block px-3 py-2 text-white hover:bg-gray-700 rounded-md"
                onClick={() => setMenuOpen(false)}
              >
                Buy a Car
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-white hover:bg-gray-700 rounded-md"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-white hover:bg-gray-700 rounded-md"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
