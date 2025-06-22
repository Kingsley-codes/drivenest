// components/ui/HomepageCarCard.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { RentalCar, SaleCar } from "../types/car";

interface CarCardProps {
  car: RentalCar | SaleCar;
  isCenter?: boolean;
  displayMode: "rental" | "sale";
  isAnyCardHovered: boolean;
  onHover: (isHovered: boolean) => void;
  isHovered: boolean;
  className?: string;
}

export default function HomepageCarCard({
  car,
  isCenter = false,
  displayMode,
  isAnyCardHovered,
  onHover,
  isHovered,
}: CarCardProps) {
  // Determine the scale based on hover and center status
  const getScale = () => {
    if (isHovered) return "scale-125 z-20"; // Hovered card gets magnified
    if (!isAnyCardHovered && isCenter) return "scale-125 z-10"; // Center card when nothing is hovered
    return "scale-100 opacity-90"; // Default state
  };

  return (
    <div
      className={`flex-shrink-0 transition-all duration-300 ease-in-out ${getScale()}`}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div
        className={`bg-gray-800 rounded-lg overflow-hidden flex flex-col h-60 sm:h-66 mx-2 w-[220px] sm:w-[270px] ${
          isHovered || (!isAnyCardHovered && isCenter)
            ? "shadow-xl shadow-amber-400/30"
            : ""
        }`}
      >
        <Link href={`/collections/${car._id}`} className="flex flex-col h-full">
          {/* Image container with fixed aspect ratio */}
          <div className="relative pt-[60%]">
            <div className="pt-3 pl-3 pr-3 absolute top-0 w-full z-10">
              <h3 className="text-xl font-bold text-white">{car.brand}</h3>
              <h3 className="text-base font-semibold text-amber-300">
                {car.model}
              </h3>
            </div>
            {car.images?.[0] && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-[70%] w-[70%] mt-24 rounded-lg overflow-hidden">
                  <Image
                    src={car.images[0]}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    className="object-cover"
                    priority={false}
                  />
                </div>
              </div>
            )}
            <div className="absolute top-2 right-2 bg-gray-950 bg-opacity-80 text-amber-400 px-3 py-1 rounded-md text-sm">
              {car.year}
            </div>
          </div>

          {/* Text content */}
          <div className="p-3 flex-grow flex flex-col bg-gray-800">
            <div className="mt-auto">
              <div className="flex justify-between gap-1 items-center">
                <div>
                  {displayMode === "sale" && "salesPrice" in car && (
                    <p className="font-bold text-base text-white">
                      ${car.salesPrice.toLocaleString()}
                    </p>
                  )}
                  {displayMode === "rental" && "rentalPrice" in car && (
                    <p className="font-bold text-lg text-white">
                      ${car.rentalPrice}/day
                    </p>
                  )}
                </div>
                <div className="text-sm flex gap-1">
                  {displayMode === "rental" && "isAvailable" in car && (
                    <span
                      className={`px-2 py-1 rounded-md ${
                        car.isAvailable
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {car.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  )}
                  {displayMode === "sale" && "inStock" in car && (
                    <span
                      className={`px-2 py-1 rounded-md ${
                        car.inStock
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {car.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  )}
                </div>
              </div>
              <div className="my-1">
                <p className="text-gray-300 text-xs capitalize">
                  {car.modelCategory.toLowerCase()} • {car.carType}
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
