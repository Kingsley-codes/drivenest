"use client";

import { useState } from "react";
import Link from "next/link";
import { FiInstagram } from "react-icons/fi";
import { FiTwitter } from "react-icons/fi";
import { PiLinkedinLogoBold } from "react-icons/pi";
import { AiOutlineFacebook } from "react-icons/ai";

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const footerSections = {
    Navigation: [
      "Brands",
      "Categories",
      "Locations",
      "Services",
      "Blog",
      "FAQ",
      "Contact",
    ],
    Brands: [
      "The Rolls Royce Collection",
      "The Lamborghini Collection",
      "The Porsche Collection",
      "The Range Rover Collection",
      "The Audi Collection",
      "The Aston Martin Collection",
      "The Bentley Collection",
      "The Mercedes Benz Collection",
      "The Ferrari Collection",
    ],
    Categories: [
      "The Super Cars Collection",
      "The Executive Collection",
      "The SUV 4X4 Collection",
      "The MPV Collection",
      "The Convertible Collection",
    ],
    Legals: [
      "Privacy Policy",
      "Terms And Conditions",
      "Cookies Policy",
      "Loyalty Terms And Conditions",
    ],
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="bg-gray-950 text-white border-t pb-10 border-amber-300">
      {/* Logo */}
      <div className="w-full text-center mt-4 pt-7 mb-4">
        <Link href="/" className="text-4xl font-pt-serif font-bold">
          <span className="text-amber-400">Drive</span>
          <span className="text-white">Nest</span>
        </Link>

        <h2 className="text-xl my-3 text-amber-400 font-semibold">
          Where Every Journey Begins in Style
        </h2>

        <p className="text-md py-2 text-amber-400 max-w-2xl mx-auto">
          DriveNest offers a premium selection of luxury and everyday cars for
          rent or purchase. Whether you're cruising in style or commuting with
          ease, we&apos;ve got the perfect ride for every road. Simple,
          reliable, and tailored to your journey—DriveNest gets you there.
        </p>

        <h2 className="text-lg my-3 text-amber-400 font-semibold">
          Follow Us On Social Media
        </h2>

        <div className="flex justify-center items-center space-x-4">
          <a href="#" className="text-amber-400 hover:text-amber-300">
            <AiOutlineFacebook className="w-9 h-9" />
          </a>

          <a href="#" className="text-amber-400 hover:text-amber-300">
            <FiInstagram className="w-8 h-8" />
          </a>

          <a href="#" className="text-amber-400 hover:text-amber-300">
            <FiTwitter className="w-7 h-7" />
          </a>

          <a href="#" className="text-amber-400 hover:text-amber-300">
            <PiLinkedinLogoBold className="w-8 h-8" />
          </a>
        </div>
      </div>

      <div className="container mx-auto rounded-lg text-gray-900 bg-amber-400 px-4 py-8">
        <div className="grid grid-cols-1 pl-7 md:grid-cols-4 gap-8">
          {Object.entries(footerSections).map(([title, items]) => (
            <div key={title} className="mb-6 md:mb-0">
              {/* Mobile dropdown button */}
              <button
                className="md:hidden w-full flex justify-between items-center py-2 text-left"
                onClick={() => toggleSection(title)}
              >
                <h3 className="text-lg font-bold">{title}</h3>
                <svg
                  className={`w-5 h-5 text-gray-900 transition-transform ${
                    openSection === title ? "rotate-180" : ""
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
              </button>

              {/* Desktop always visible */}
              <h3 className="hidden md:block text-lg font-bold mb-4">
                {title}
              </h3>

              {/* Mobile dropdown content */}
              <div
                className={`md:hidden ${
                  openSection === title ? "block" : "hidden"
                }`}
              >
                <ul className="space-y-2 px-6 mt-2">
                  {items.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-900 hover:text-gray-700 transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Desktop list */}
              <ul className="hidden md:block space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-900 hover:text-gray-700 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-amber-400 mt-8 pt-8 text-center text-amber-400">
        <p>© {new Date().getFullYear()} DriveNest. All rights reserved.</p>
      </div>
    </footer>
  );
}
