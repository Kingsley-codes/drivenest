"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface Car {
  _id: string;
  brand: string;
  model: string;
  year: number;
  color: string[];
  carType: "regular" | "luxury" | "electric";
  modelCategory: string;
  salesPrice?: number;
  rentalPrice?: number;
  mileage?: number;
  isAvailable: boolean;
  inStock: boolean;
  images?: string[];
  forSale: boolean;
  forRent: boolean;
  description: string;
  availableDate?: string;
}

export default function CarDetailsPage() {
  const params = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!params?.carId) {
      setError("Missing car ID in URL");
      setLoading(false);
      return;
    }
    console.log("Fetching car with ID:", params.carId);

    const fetchCar = async () => {
      try {
        const response = await fetch(`/api/cars/${params.carId}`);

        if (!response.ok) {
          const errorData = await response.json();
          console.error("API Error:", errorData); // Log detailed error
          throw new Error("Car not found");
        }

        const data = await response.json();
        console.log("Received car data:", data); // Log received data
        setCar(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load car");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [params.carId]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error)
    return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!car) return <div className="text-center py-20">Car not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/collections"
        className="text-amber-400 hover:underline mb-4 inline-block"
      >
        &larr; Back to Collections
      </Link>

      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Image Gallery */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {car.images?.map((image, index) => (
              <div
                key={index}
                className="relative h-64 md:h-80 rounded-lg overflow-hidden"
              >
                <Image
                  src={image}
                  alt={`${car.brand} ${car.model} - ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Car Details */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white">
                {car.brand} {car.model}
              </h1>
              <p className="text-gray-400">
                {car.year} • {car.modelCategory} • {car.carType}
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              {car.forSale && (
                <p className="text-2xl font-bold text-amber-400">
                  ${car.salesPrice?.toLocaleString()}
                </p>
              )}
              {car.forRent && (
                <p className="text-lg text-amber-300">${car.rentalPrice}/day</p>
              )}
            </div>
          </div>

          {/* Status Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {car.forRent && (
              <span
                className={`px-3 py-1 rounded-full text-sm ${car.isAvailable ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"}`}
              >
                {car.isAvailable ? "Available for Rent" : "Not Available"}
              </span>
            )}
            {car.forSale && (
              <span
                className={`px-3 py-1 rounded-full text-sm ${car.inStock ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"}`}
              >
                {car.inStock ? "In Stock" : "Out of Stock"}
              </span>
            )}
            {!car.isAvailable && car.availableDate && (
              <span className="px-3 py-1 rounded-full bg-blue-900 text-blue-300 text-sm">
                Available from:{" "}
                {new Date(car.availableDate).toLocaleDateString()}
              </span>
            )}
          </div>

          {/* Color Indicators */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">Colors</h3>
            <div className="flex gap-2">
              {car.color.map((color, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full border border-gray-600"
                  style={{ backgroundColor: color }}
                  title={color.charAt(0).toUpperCase() + color.slice(1)}
                />
              ))}
            </div>
          </div>

          {/* Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-amber-400 mb-4">
                Specifications
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-gray-700 py-2">
                  <span className="text-gray-400">Brand</span>
                  <span className="text-white">{car.brand}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 py-2">
                  <span className="text-gray-400">Model</span>
                  <span className="text-white">{car.model}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 py-2">
                  <span className="text-gray-400">Year</span>
                  <span className="text-white">{car.year}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 py-2">
                  <span className="text-gray-400">Type</span>
                  <span className="text-white capitalize">{car.carType}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 py-2">
                  <span className="text-gray-400">Category</span>
                  <span className="text-white capitalize">
                    {car.modelCategory}
                  </span>
                </div>
                {car.mileage && (
                  <div className="flex justify-between border-b border-gray-700 py-2">
                    <span className="text-gray-400">Mileage</span>
                    <span className="text-white">
                      {car.mileage.toLocaleString()} miles
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Pricing & Availability */}
            <div>
              <h3 className="text-xl font-semibold text-amber-400 mb-4">
                {car.forSale && car.forRent
                  ? "Pricing & Availability"
                  : car.forSale
                    ? "Pricing"
                    : "Availability"}
              </h3>
              <div className="space-y-3">
                {car.forSale && (
                  <div className="flex justify-between border-b border-gray-700 py-2">
                    <span className="text-gray-400">Sales Price</span>
                    <span className="text-white">
                      ${car.salesPrice?.toLocaleString()}
                    </span>
                  </div>
                )}
                {car.forRent && (
                  <div className="flex justify-between border-b border-gray-700 py-2">
                    <span className="text-gray-400">Rental Price</span>
                    <span className="text-white">${car.rentalPrice}/day</span>
                  </div>
                )}
                <div className="flex justify-between border-b border-gray-700 py-2">
                  <span className="text-gray-400">Status</span>
                  <span
                    className={`${car.forSale ? (car.inStock ? "text-green-400" : "text-red-400") : car.isAvailable ? "text-green-400" : "text-red-400"}`}
                  >
                    {car.forSale
                      ? car.inStock
                        ? "In Stock"
                        : "Out of Stock"
                      : car.isAvailable
                        ? "Available"
                        : "Not Available"}
                  </span>
                </div>
                {!car.isAvailable && car.availableDate && (
                  <div className="flex justify-between border-b border-gray-700 py-2">
                    <span className="text-gray-400">Available From</span>
                    <span className="text-white">
                      {new Date(car.availableDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-amber-400 mb-4">
              Description
            </h3>
            <p className="text-gray-300 whitespace-pre-line">
              {car.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {car.forSale && car.inStock && (
              <button className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium">
                Purchase Now
              </button>
            )}
            {car.forRent && car.isAvailable && (
              <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
                Rent This Car
              </button>
            )}
            <Link
              href="/contact"
              className="px-6 py-3 border border-amber-400 text-amber-400 rounded-lg hover:bg-amber-400 hover:text-white transition-colors font-medium text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
