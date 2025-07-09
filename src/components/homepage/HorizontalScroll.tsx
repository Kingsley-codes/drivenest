// components/HorizontalScroll.tsx
"use client";
import { useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { Car } from "../types/car";
import HomepageCarCard from "../ui/HomepageCarCard";

interface HorizontalScrollProps {
  cars: Car[];
  title: string;
  subtitle?: string;
  displayMode: "rental" | "sale";
}

export default function HorizontalScroll({
  cars,
  title,
  subtitle,
  displayMode,
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const cardWidth = 270; // Fixed card width
  const gap = 16; // Gap between cards

  const checkScrollPosition = () => {
    if (!containerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
  };

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;

    const scrollAmount = cardWidth + gap;
    containerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Determine the "More" link based on displayMode
  const moreLink = displayMode === "sale" ? "/sales" : "/rentals";

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-amber-400">{title}</h2>
          {subtitle && (
            <p className="text-white mt-3 max-w-2xl mx-auto text-lg">
              {subtitle}
            </p>
          )}
        </div>

        <div className="relative">
          {showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-gray-950 bg-opacity-90 text-amber-400 p-3 rounded-full hover:bg-amber-400 hover:text-gray-950 transition-all duration-200 shadow-lg"
              aria-label="Scroll left"
            >
              <FiChevronLeft size={28} />
            </button>
          )}

          <div
            ref={containerRef}
            className="flex overflow-x-auto scroll-smooth w-full px-12 py-6 hide-scrollbar"
            onScroll={checkScrollPosition}
          >
            <div
              className="flex flex-nowrap items-center"
              style={{ gap: `${gap}px` }}
            >
              {cars.map((car) => (
                <HomepageCarCard
                  key={car._id}
                  car={car}
                  displayMode={displayMode}
                />
              ))}
            </div>
          </div>

          <div className="w-full flex items-center justify-end">
            <Link
              href={moreLink}
              className="text-amber-400 hover:border-b hover:rounded-md px-2 flex items-center gap-1.5"
            >
              More
              <FaArrowRight />
            </Link>
          </div>

          {showRightArrow && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-gray-950 bg-opacity-90 text-amber-400 p-3 rounded-full hover:bg-amber-400 hover:text-gray-950 transition-all duration-200 shadow-lg"
              aria-label="Scroll right"
            >
              <FiChevronRight size={28} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
