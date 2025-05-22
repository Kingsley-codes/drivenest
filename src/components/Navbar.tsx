"use client";

import Link from "next/link";
import { GiCancel } from "react-icons/gi";
import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Unified auth redirection handler
  const handleAuthNavigation = (targetPath: string) => {
    // Store current path before redirecting to auth
    localStorage.setItem("preRegisterPath", pathname);
    router.push(targetPath);
  };

  const mobileMenuClick = (targetPath: string) => {
    setMenuOpen(false);
    handleAuthNavigation(targetPath);
  };

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
    <nav className="bg-gray-950 shadow border-b-amber-400 border-b-2">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 py-4 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex items-center">
            {/* Mobile menu button */}
            <div className="sm:hidden mr-3">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white focus:outline-none"
              >
                <FaBars className="block cursor-pointer text-amber-400 h-6 w-6 m-2" />
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-4xl font-pt-serif font-bold">
                <span className="text-amber-400">Drive</span>
                <span className="text-white">Nest</span>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:block">
            <ul className="flex text-xl space-x-4">
              <li className="px-3 py-2 hover:text-white hover:border-b-1 text-amber-400 hover:border-amber-300 transition-all duration-100 ease-in-out rounded-md">
                <Link href="/collections">Garage</Link>
              </li>
              <li className="px-3 py-2 hover:text-white hover:border-b-1 text-amber-400 hover:border-amber-300 transition-all duration-100 ease-in-out rounded-md">
                <Link href="/rentals">Rent a Car</Link>
              </li>
              <li className="px-3 py-2 hover:text-white hover:border-b-1 text-amber-400 hover:border-amber-300 transition-all duration-100 ease-in-out rounded-md">
                <Link href="/sales">Buy a Car</Link>
              </li>
              <li className="px-3 py-2 hover:text-white hover:border-b-1 text-amber-400 hover:border-amber-300 transition-all duration-100 ease-in-out rounded-md">
                <Link href="/contact">Contact</Link>
              </li>
              <li className="px-3 py-2 hover:text-white hover:border-b-1 text-amber-400 hover:border-amber-300 transition-all duration-100 ease-in-out rounded-md">
                <Link href="/about">About</Link>
              </li>
              <li
                onClick={() => handleAuthNavigation("/login")}
                className="pl-3 pr-3 ml-9 py-2 mr-0 hover:text-white border-r-1 text-amber-400 border-amber-400 hover:border-b-1 hover:border-amber-300 transition-all duration-100 ease-in-out rounded-b-sm cursor-pointer"
              >
                Login
              </li>
              <li
                onClick={() => handleAuthNavigation("/register")}
                className="pl-3 py-2 ml-0 hover:text-white border-l-1 text-amber-400 border-amber-400 hover:border-b-1 hover:border-amber-300 transition-all duration-100 ease-in rounded-b-sm cursor-pointer"
              >
                Sign Up
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden">
          <div className="mobile-menu-container absolute top-0 left-0 h-full w-3/4 bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col">
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 golden m-2 rounded-md hover:bg-gray-800 cursor-pointer focus:outline-none"
                >
                  <GiCancel className="h-6 w-6" />
                </button>
              </div>

              <Link
                href="/collections"
                className="block px-3 py-2 hover:text-white hover:border-l-4 hover:border-amber-400 text-amber-300 hover:bg-gray-700 rounded-md"
                onClick={() => setMenuOpen(false)}
              >
                Garage
              </Link>
              <Link
                href="/rentals"
                className="block px-3 py-2 hover:text-white hover:border-l-4 hover:border-amber-400 text-amber-300 hover:bg-gray-700 rounded-md"
                onClick={() => setMenuOpen(false)}
              >
                Rent a Car
              </Link>
              <Link
                href="/sales"
                className="block px-3 py-2 hover:text-white hover:border-l-4 hover:border-amber-400 text-amber-300 hover:bg-gray-700 rounded-md"
                onClick={() => setMenuOpen(false)}
              >
                Buy a Car
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 hover:text-white hover:border-l-4 hover:border-amber-400 text-amber-300 hover:bg-gray-700 rounded-md"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 hover:text-white hover:border-l-4 hover:border-amber-400 text-amber-300 hover:bg-gray-700 rounded-md"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>

              <div className="flex mt-16">
                <button
                  onClick={() => mobileMenuClick("/login")}
                  className="block px-3 py-2 hover:text-white text-amber-300 border-r-1 border-amber-300 hover:border-b-1 hover:border-amber-400 transition-all duration-100 ease-in rounded-sm"
                >
                  Login
                </button>
                <button
                  onClick={() => mobileMenuClick("/register")}
                  className="block px-3 py-2 hover:text-white text-amber-300 border-l-1 border-amber-300 hover:border-b-1 hover:border-amber-400 transition-all duration-100 ease-in rounded-sm"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
