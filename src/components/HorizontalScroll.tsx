"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import HomepageCarCard from "./ui/HomepageCarCard";
import { Car } from "./types/car";

interface HorizontalScrollProps {
  cars: Car[];
  title: string;
  subtitle?: string;
}

export default function HorizontalScroll({
  cars,
  title,
  subtitle,
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [centerIndex, setCenterIndex] = useState(1); // Start with middle card
  const [showArrows, setShowArrows] = useState({ left: true, right: true });
  const [visibleCards, setVisibleCards] = useState<Car[]>([]);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Reset center index when switching between mobile and desktop
      setCenterIndex(isMobile ? 1 : 2);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, [isMobile]);

  // Create a circular array of cards with center in the middle
  useEffect(() => {
    if (cars.length === 0) return;

    const getCardIndex = (index: number) => {
      // Handle circular array
      if (index < 0) return cars.length + (index % cars.length);
      return index % cars.length;
    };

    const offset = isMobile ? 1 : 2;
    const newVisibleCards = [];

    for (let i = -offset; i <= offset; i++) {
      newVisibleCards.push(cars[getCardIndex(centerIndex + i)]);
    }

    setVisibleCards(newVisibleCards);
  }, [cars, centerIndex, isMobile]);

  const scrollToCenter = useCallback(
    (index: number) => {
      setCenterIndex(() => {
        // Handle circular navigation
        if (index < 0) return cars.length - 1;
        if (index >= cars.length) return 0;
        return index;
      });
    },
    [cars.length]
  );

  const scrollLeft = useCallback(() => {
    scrollToCenter(centerIndex - 1);
  }, [centerIndex, scrollToCenter]);

  const scrollRight = useCallback(() => {
    scrollToCenter(centerIndex + 1);
  }, [centerIndex, scrollToCenter]);

  // Update arrow visibility based on position
  useEffect(() => {
    setShowArrows({
      left: cars.length > (isMobile ? 1 : 2),
      right: cars.length > (isMobile ? 1 : 2),
    });
  }, [cars.length, isMobile]);

  // Touch event handlers for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    e.stopPropagation(); // Prevent scrolling the entire page
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
    e.stopPropagation(); // Prevent scrolling the entire page
  };

  const handleTouchEnd = () => {
    const threshold = 50;
    const difference = touchStartX.current - touchEndX.current;

    if (difference > threshold) {
      // Swipe left
      scrollRight();
    } else if (difference < -threshold) {
      // Swipe right
      scrollLeft();
    }
  };

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
          {showArrows.left && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-gray-950 bg-opacity-90 text-amber-400 p-3 rounded-full hover:bg-amber-400 hover:text-gray-950 transition-all duration-200 shadow-lg"
              aria-label="Scroll left"
            >
              <FiChevronLeft size={28} />
            </button>
          )}

          <div
            ref={containerRef}
            className="flex justify-start md:justify-center overflow-x-auto no-scrollbar items-center gap-4 touch-pan-x px-4 py-6 md:px-12 snap-x snap-mandatory"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {visibleCards.map((car, index) => (
              <div
                key={`${car._id}-${index}`}
                className={`snap-center ${isMobile ? "min-w-[85vw]" : "min-w-[320px]"}`}
              >
                <HomepageCarCard
                  car={car}
                  isCenter={index === (isMobile ? 1 : 2)}
                  isAnyCardHovered={hoveredCardIndex !== null}
                  onHover={(isHovered) =>
                    setHoveredCardIndex(isHovered ? index : null)
                  }
                  isHovered={hoveredCardIndex === index}
                  displayMode={title.includes("Rental") ? "rental" : "sale"}
                />
              </div>
            ))}
          </div>

          {showArrows.right && (
            <button
              onClick={scrollRight}
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
