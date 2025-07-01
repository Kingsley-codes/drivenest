"use client";
import Link from "next/link";
import Image from "next/image";
import { RentalCar, SaleCar } from "../types/car";

interface CarCardProps {
  car: RentalCar | SaleCar;
  displayMode: "rental" | "sale";
  className?: string;
}

export default function HomepageCarCard({
  car,
  displayMode,
  className = "",
}: CarCardProps) {
  // Type guard functions
  const isSaleCar = (car: RentalCar | SaleCar): car is SaleCar => {
    return displayMode === "sale" && "forSale" in car && car.forSale;
  };

  const isRentalCar = (car: RentalCar | SaleCar): car is RentalCar => {
    return displayMode === "rental" && "forRent" in car && car.forRent;
  };

  return (
    <div className={`flex-shrink-0 ${className}`}>
      <div className="bg-gray-800 rounded-lg overflow-hidden hover:scale-115 flex flex-col h-65 sm:h-70 mx-2 w-[220px] sm:w-[270px]">
        <Link href={`/collections/${car._id}`} className="flex flex-col h-full">
          {/* Image container with fixed aspect ratio */}
          <div className="relative pt-[70%]">
            <div className="pt-3 pl-3 pr-3 absolute top-0 w-full z-10">
              <h3 className="text-xl font-bold text-white">{car.brand}</h3>
              <h3 className="text-base font-semibold text-amber-300">
                {car.model}
              </h3>
            </div>
            {car.images?.[0] && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-[90%] w-[90%] mt-24 rounded-lg overflow-hidden">
                  <Image
                    src={car.images[0]}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    className="object-contain"
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
                  {displayMode === "sale" && isSaleCar(car) && (
                    <p className="font-bold text-base text-white">
                      ${car.salesPrice.toLocaleString()}
                    </p>
                  )}
                  {displayMode === "rental" && isRentalCar(car) && (
                    <p className="font-bold text-lg text-white">
                      ${car.rentalPrice}/day
                    </p>
                  )}
                </div>
                <div className="text-sm flex gap-1">
                  {displayMode === "rental" && isRentalCar(car) && (
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
                  {displayMode === "sale" && isSaleCar(car) && (
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
