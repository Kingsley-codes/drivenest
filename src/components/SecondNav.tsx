"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function SecondNav() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timeout when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = (category: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(category);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 300); // 300ms delay before closing
  };

  const categories = {
    "Luxury Brands": [
      "Rolls-Royce",
      "Bentley",
      "Mercedes-Benz",
      "BMW",
      "Audi",
      "Lexus",
      "Porsche",
      "Jaguar",
      "Land Rover",
      "Cadillac",
      "Lincoln",
      "Maserati",
      "Aston Martin",
      "Genesis",
      "Alfa Romeo",
    ],
    "Regular Brands": [
      "Toyota",
      "Honda",
      "Ford",
      "Chevrolet",
      "Nissan",
      "Hyundai",
      "Kia",
      "Volkswagen",
      "Subaru",
      "Mazda",
      "Mitsubishi",
      "Fiat",
      "Jeep",
      "Dodge",
      "Volvo",
    ],
    "EV Brands": [
      "Tesla",
      "Rivian",
      "Lucid Motors",
      "Polestar",
      "NIO",
      "BYD",
      "Fisker",
      "XPeng",
      "Faraday Future",
      "Rimac",
    ],
    "Model Categories": [
      "Supercars",
      "Convertibles",
      "SUV",
      "Sports",
      "Sedan",
      "Trucks",
    ],
  };

  return (
    <nav className="bg-transparent absolute top-0 left-0 w-full z-20 md:block hidden text-white">
      <ul className="flex pt-4 justify-center border-t border-amber-300 space-x-6">
        {Object.keys(categories).map((category) => (
          <li
            key={category}
            className="relative group"
            onMouseEnter={() => handleMouseEnter(category)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="px-4 py-2 hover:bg-gray-700 rounded-md transition-colors duration-200 flex items-center cursor-pointer">
              {category}
              <svg
                className={`ml-2 h-4 w-4 transition-transform duration-200 ${
                  activeDropdown === category ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {activeDropdown === category && (
              <div
                className={`absolute z-10 mt-2 origin-top-left rounded-md bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 ${
                  category === "Model Categories"
                    ? "w-48"
                    : category === "EV Brands"
                      ? "w-[400px]"
                      : "w-[600px]"
                }`}
                onMouseEnter={() => handleMouseEnter(category)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="py-1">
                  {category === "Luxury Brands" ||
                  category === "Regular Brands" ? (
                    <div className="grid grid-cols-3 divide-x divide-gray-500">
                      {categories[category as keyof typeof categories].map(
                        (item) => (
                          <div key={item} className="p-3">
                            <Link
                              href={`/brands/${item
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                              className="block px-4 py-2 text-sm hover:bg-gray-600 rounded"
                            >
                              {item}
                            </Link>
                          </div>
                        )
                      )}
                    </div>
                  ) : category === "EV Brands" ? (
                    <div className="grid grid-cols-2 divide-x divide-gray-500">
                      {categories[category as keyof typeof categories].map(
                        (item) => (
                          <div key={item} className="p-3">
                            <Link
                              href={`/ev-brands/${item
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                              className="block px-4 py-2 text-sm hover:bg-gray-600 rounded"
                            >
                              {item}
                            </Link>
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <div className="p-2">
                      {categories[category as keyof typeof categories].map(
                        (item) => (
                          <Link
                            key={item}
                            href={`/models/${item.toLowerCase()}`}
                            className="block px-4 py-2 text-sm hover:bg-gray-600 rounded"
                          >
                            {item}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
