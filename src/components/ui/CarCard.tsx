// components/CarCard.tsx
"use client";
import Link from "next/link";
import Image from "next/image";

interface CarCardProps {
  _id: string;
  brand: string;
  model: string;
  year: number;
  carType: string;
  modelCategory: string;
  images?: string[];
  // For sale properties
  salesPrice?: number;
  inStock?: boolean;
  // For rent properties
  rentalPrice?: number;
  isAvailable?: boolean;
  // Listing type flags
  forSale?: boolean;
  forRent?: boolean;
}

export default function CarCard({
  _id,
  brand,
  model,
  year,
  carType,
  modelCategory,
  images,
  salesPrice,
  rentalPrice,
  inStock,
  isAvailable,
  forSale,
  forRent,
}: CarCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden flex flex-col h-full">
      <Link href={`/collections/${_id}`} className="flex flex-col h-full">
        {/* Image container with fixed aspect ratio */}
        <div className="relative pt-[80%]">
          <div className="pb-2 pt-4 w-full absolute top-0 pl-4 ">
            <h3 className="text-xl font-semibold">{brand}</h3>
            <h3 className="text-md font-semibold">{model}</h3>
          </div>
          {images?.[0] && (
            <Image
              src={images[0]}
              alt={`${brand} ${model}`}
              width={500}
              height={300}
              className="object-cover absolute bottom-0 left-0"
              priority={false}
            />
          )}
          <div className="absolute top-2 right-2 bg-gray-950 bg-opacity-70 text-amber-400 px-2 py-1 rounded text-sm">
            {year}
          </div>
        </div>

        {/* Text content with consistent padding and fixed height */}
        <div className="p-4 pt-9 flex-grow flex flex-col">
          <div className="mt-auto">
            <div className="flex justify-between gap-1 items-center">
              <div>
                {forSale && salesPrice !== undefined && (
                  <p className="font-bold text-sm">
                    Sale: ${salesPrice.toLocaleString()}
                  </p>
                )}
                {forRent && rentalPrice !== undefined && (
                  <p className="font-bold text-sm">Rent: ${rentalPrice}/day</p>
                )}
              </div>
              <div className="text-sm flex gap-1">
                {forRent && isAvailable !== undefined && (
                  <span
                    className={`px-2 py-1 rounded ${
                      isAvailable
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {isAvailable ? "Available" : "Unavailable"}
                  </span>
                )}
                {forSale && inStock !== undefined && (
                  <span
                    className={`px-2 py-1 rounded ${
                      inStock
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {inStock ? "In Stock" : "Out of Stock"}
                  </span>
                )}
              </div>
            </div>
            <div className="mb-2">
              <p className="text-gray-400 text-sm capitalize">
                {modelCategory.toLowerCase()} • {carType}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
