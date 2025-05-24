"use client";

import Link from "next/link";
import { GiCancel } from "react-icons/gi";
import { FaBars, FaRegUser, FaChevronDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type User = {
  username: string;
};

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<User | null>(null);

  // Check auth status
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("/api/auth/check", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(data.authenticated);
          if (data.authenticated && data.user) {
            setUserData(data.user);
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [pathname]);

  const handleAuthNavigation = (targetPath: string) => {
    localStorage.setItem("preRegisterPath", pathname);
    router.push(targetPath);
  };

  const mobileMenuClick = (targetPath: string) => {
    setMenuOpen(false);
    handleAuthNavigation(targetPath);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      setIsLoggedIn(false);
      setUserData(null);
      setUserDropdownOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuOpen &&
        !(event.target as Element).closest(".mobile-menu-container")
      ) {
        setMenuOpen(false);
      }
      if (
        userDropdownOpen &&
        !(event.target as Element).closest(".user-dropdown")
      ) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen, userDropdownOpen]);

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
          <div className="hidden sm:flex justify-between items-center">
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
            </ul>

            <div className="flex items-center ml-4">
              {isLoading ? (
                <div className="h-8 w-8 rounded-full bg-gray-800 animate-pulse"></div>
              ) : isLoggedIn ? (
                <div className="relative user-dropdown">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center text-amber-400 hover:text-white transition-all duration-100 ease-in-out p-2 rounded-md"
                  >
                    <FaRegUser className="h-5 w-5 mr-1" />
                    {userData?.username && (
                      <span className="mr-1">{userData.username}</span>
                    )}
                    <FaChevronDown
                      className={`h-3 w-3 transition-transform ${
                        userDropdownOpen ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg py-1 z-50 border border-amber-400">
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-amber-300 hover:text-white hover:bg-gray-800"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/orders"
                        className="block px-4 py-2 text-amber-300 hover:text-white hover:bg-gray-800"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-amber-300 hover:text-white hover:bg-gray-800"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={() => handleAuthNavigation("/login")}
                    className="pl-3 pr-3 py-2 hover:text-white border-r-1 text-amber-400 border-amber-400 hover:border-b-1 hover:border-amber-300 transition-all duration-100 ease-in-out rounded-b-sm cursor-pointer"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleAuthNavigation("/register")}
                    className="pl-3 py-2 hover:text-white border-l-1 text-amber-400 border-amber-400 hover:border-b-1 hover:border-amber-300 transition-all duration-100 ease-in rounded-b-sm cursor-pointer"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
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
                {isLoading ? (
                  <div className="w-full text-center py-2">
                    <div className="inline-block h-4 w-4 rounded-full bg-amber-400 animate-pulse"></div>
                  </div>
                ) : isLoggedIn ? (
                  <div className="w-full">
                    <div className="border-t border-amber-400 my-2"></div>
                    <Link
                      href="/dashboard"
                      className="block px-3 py-2 hover:text-white hover:border-l-4 hover:border-amber-400 text-amber-300 hover:bg-gray-700 rounded-md"
                      onClick={() => setMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-3 py-2 hover:text-white hover:border-l-4 hover:border-amber-400 text-amber-300 hover:bg-gray-700 rounded-md"
                      onClick={() => setMenuOpen(false)}
                    >
                      Orders
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 hover:text-white hover:border-l-4 hover:border-amber-400 text-amber-300 hover:bg-gray-700 rounded-md"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
