"use client";

import Link from "next/link";
import { GiCancel } from "react-icons/gi";
import { FaBars, FaRegUser, FaChevronDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { useAuthQuery } from "../../lib/hooks/useAuthQuery";
import { useQueryClient } from "@tanstack/react-query";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: authData } = useAuthQuery();
  const isAuthenticated = !!authData?.user;

  const handleAuthNavigation = async (targetPath: string) => {
    setAuthLoading(true);
    document.cookie = `preRegisterPath=${pathname}; path=/`;
    await router.push(targetPath);
    setAuthLoading(false);
  };

  const mobileMenuClick = async (targetPath: string) => {
    setMenuOpen(false);
    await handleAuthNavigation(targetPath);
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      // Clear the auth query cache
      await queryClient.invalidateQueries({ queryKey: ["auth"] });
      setUserDropdownOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
            <div className="md:hidden mr-3">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white focus:outline-none"
              >
                <FaBars className="text-amber-400 h-6 w-6 m-2" />
              </button>
            </div>

            {/* Logo */}
            <Link href="/" className="text-4xl font-pt-serif font-bold">
              <span className="text-amber-400">Drive</span>
              <span className="text-white">Nest</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-between items-center">
            <ul className="flex text-xl space-x-4">
              {["collections", "rentals", "sales", "contact", "about"].map(
                (page) => (
                  <li
                    key={page}
                    className="px-3 py-2 text-amber-400 hover:text-white hover:border-b-1 hover:border-amber-300 transition-all duration-100 ease-in-out rounded-md"
                  >
                    <Link href={`/${page}`}>
                      {page === "collections"
                        ? "Garage"
                        : page === "sales"
                          ? "Buy a Car"
                          : page === "rentals"
                            ? "Rent a Car"
                            : page.charAt(0).toUpperCase() + page.slice(1)}
                    </Link>
                  </li>
                )
              )}
            </ul>

            <div className="flex items-center ml-4">
              {isAuthenticated ? (
                <>
                  <div className="h-2 w-2 rounded-full bg-amber-400 animate-pulse"></div>

                  <div className="relative user-dropdown ml-2">
                    <button
                      onClick={() => setUserDropdownOpen((prev) => !prev)}
                      className="flex items-center text-amber-400 hover:text-white transition-all duration-100 ease-in-out p-2 rounded-md"
                    >
                      <FaRegUser className="h-5 w-5 mr-1" />
                      <span className="mr-1">
                        {authData.user.username || "Account"}
                      </span>
                      <FaChevronDown
                        className={`h-3 w-3 transition-transform ${
                          userDropdownOpen ? "rotate-180" : ""
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
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleAuthNavigation("/login")}
                    className="pl-3 pr-3 py-2 text-amber-400 hover:text-white border-r-1 border-amber-400 hover:border-b-1 hover:border-amber-300 transition-all duration-100 ease-in-out rounded-b-sm"
                  >
                    {authLoading ? "..." : "Login"}
                  </button>
                  <button
                    onClick={() => handleAuthNavigation("/register")}
                    className="pl-3 py-2 text-amber-400 hover:text-white border-l-1 border-amber-400 hover:border-b-1 hover:border-amber-300 transition-all duration-100 ease-in-out rounded-b-sm"
                  >
                    {authLoading ? "..." : "Sign Up"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
          <div className="mobile-menu-container absolute top-0 left-0 h-full w-3/4 bg-gray-900 shadow-xl">
            <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col">
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 m-2 rounded-md hover:bg-gray-800"
                >
                  <GiCancel className="h-6 w-6 text-amber-400" />
                </button>
              </div>

              {["collections", "rentals", "sales", "contact", "about"].map(
                (page) => (
                  <Link
                    key={page}
                    href={`/${page}`}
                    className="block px-3 py-2 text-amber-300 hover:text-white hover:border-l-4 hover:border-amber-400 hover:bg-gray-700 rounded-md"
                    onClick={() => setMenuOpen(false)}
                  >
                    {page === "collections"
                      ? "Garage"
                      : page === "sales"
                        ? "Buy a Car"
                        : page === "rentals"
                          ? "Rent a Car"
                          : page.charAt(0).toUpperCase() + page.slice(1)}
                  </Link>
                )
              )}

              <div className="flex mt-16 flex-col px-3 space-y-2">
                {isAuthenticated ? (
                  <>
                    <div className="border-t border-amber-400 my-2" />

                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-amber-400 animate-pulse"></div>

                      <button
                        onClick={() => {
                          setUserDropdownOpen((prev) => !prev);
                        }}
                        className="flex items-center text-amber-400 hover:text-white transition-all duration-100 ease-in-out p-2 rounded-md"
                      >
                        <FaRegUser className="h-5 w-5 mr-1" />
                        <span className="mr-1">
                          {authData.user.username || "Account"}
                        </span>
                        <FaChevronDown
                          className={`h-3 w-3 transition-transform ${
                            userDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {/* Dropdown Content - Only visible when userDropdownOpen is true */}
                    <div
                      className={`overflow-hidden transition-all duration-200 ease-in-out ${
                        userDropdownOpen ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      <div className="pl-8 space-y-2">
                        {" "}
                        {/* Added padding-left for indentation */}
                        <Link
                          href="/dashboard"
                          className="block text-amber-300 hover:text-white hover:border-l-4 hover:border-amber-400 hover:bg-gray-700 rounded-md py-2 pl-2"
                          onClick={() => {
                            setMenuOpen(false);
                          }}
                        >
                          Dashboard
                        </Link>
                        <Link
                          href="/orders"
                          className="block text-amber-300 hover:text-white hover:border-l-4 hover:border-amber-400 hover:bg-gray-700 rounded-md py-2 pl-2"
                          onClick={() => {
                            setMenuOpen(false);
                          }}
                        >
                          Orders
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout();
                            setMenuOpen(false);
                          }}
                          className="block text-amber-300 hover:text-white hover:border-l-4 hover:border-amber-400 hover:bg-gray-700 rounded-md py-2 pl-2 w-full text-left mb-4"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => mobileMenuClick("/login")}
                      className="text-amber-300 hover:text-white hover:border-l-4 hover:border-amber-400 hover:bg-gray-700 rounded-md py-2"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => mobileMenuClick("/register")}
                      className="text-amber-300 hover:text-white hover:border-l-4 hover:border-amber-400 hover:bg-gray-700 rounded-md py-2"
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
