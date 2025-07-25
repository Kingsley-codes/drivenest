"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { GiCancel } from "react-icons/gi";
import CarCard from "@/components/ui/CarCard";

type CarType = "regular" | "luxury" | "electric";
type ModelCategory =
  | "sedan"
  | "SUV"
  | "supercar"
  | "sports car"
  | "convertible"
  | "truck";

type availabilityStatus = "available" | "unavailable" | "all";
type sortType = "price-low" | "price-high" | "year-new" | "year-old";

interface Car {
  _id: string;
  brand: string;
  model: string;
  year: number;
  carType: CarType;
  modelCategory: ModelCategory;
  rentalPrice?: number;
  mileage?: number;
  isAvailable: boolean;
  images?: string[];
  forRent: boolean;
}

export default function RentalPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);

  // Filter states
  const [selectedCarTypes, setSelectedCarTypes] = useState<CarType[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<ModelCategory[]>(
    []
  );
  const [availabilityFilter, setAvailabilityFilter] =
    useState<availabilityStatus>("all");
  const [sortOption, setSortOption] = useState<sortType>("price-low");

  // Available options derived from cars data
  const [brands, setBrands] = useState<string[]>([]);
  const carTypes: CarType[] = ["regular", "luxury", "electric"];
  const modelCategories: ModelCategory[] = [
    "sedan",
    "SUV",
    "supercar",
    "sports car",
    "convertible",
    "truck",
  ];

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("/api/cars?forRent=true");
        const data = response.data;

        setCars(data);
        setFilteredCars(data);

        const uniqueBrands = Array.from(
          new Set(data.map((car: Car) => car.brand))
        ) as string[];

        setBrands(uniqueBrands);
      } catch (err: unknown) {
        let errorMessage = "Failed to load cars. Please try again later.";
        if (axios.isAxiosError(err)) {
          errorMessage = err.response?.data?.message || errorMessage;
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }
        setError(errorMessage);
        console.error("Error fetching cars:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    let result = [...cars];

    if (selectedCarTypes.length > 0) {
      result = result.filter((car) => selectedCarTypes.includes(car.carType));
    }

    if (selectedBrands.length > 0) {
      result = result.filter((car) => selectedBrands.includes(car.brand));
    }

    if (selectedCategories.length > 0) {
      result = result.filter((car) =>
        selectedCategories.includes(car.modelCategory)
      );
    }

    if (availabilityFilter === "available") {
      result = result.filter((car) => car.isAvailable);
    } else if (availabilityFilter === "unavailable") {
      result = result.filter((car) => !car.isAvailable);
    }

    result.sort((a, b) => {
      switch (sortOption) {
        // case "price-low":
        //   const priceA =
        //     listingType === "rent" ? a.rentalPrice || 0 : a.salesPrice || 0;
        //   const priceB =
        //     listingType === "rent" ? b.rentalPrice || 0 : b.salesPrice || 0;
        //   return priceA - priceB;
        // case "price-high":
        //   const priceAHigh =
        //     listingType === "rent" ? a.rentalPrice || 0 : a.salesPrice || 0;
        //   const priceBHigh =
        //     listingType === "rent" ? b.rentalPrice || 0 : b.salesPrice || 0;
        //   return priceBHigh - priceAHigh;

        case "year-new":
          return b.year - a.year;
        case "year-old":
          return a.year - b.year;
        default:
          return 0;
      }
    });

    setFilteredCars(result);
  }, [
    cars,
    selectedCarTypes,
    selectedBrands,
    selectedCategories,
    availabilityFilter,
    sortOption,
  ]);

  const toggleCarType = (type: CarType) => {
    setSelectedCarTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleCategory = (category: ModelCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearAllFilters = () => {
    setSelectedCarTypes([]);
    setSelectedBrands([]);
    setSelectedCategories([]);
    setAvailabilityFilter("all");
    setSortOption("price-low");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <div className="text-center py-20">
          <p className="text-xl">Loading cars...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20 text-red-500">
          <p className="text-xl">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-8 text-center">
            Car Collections
          </h1>

          {/* Mobile Filter Button */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className=" bg-amber-400 px-4 py-2 rounded-lg shadow-lg flex items-center"
            >
              <span className="font-semibold text-xl">Filters</span>
              {filterOpen ? (
                <GiCancel className="ml-2 text-xl" />
              ) : (
                <span className="ml-2 font-semibold text-xl">+</span>
              )}
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <div
              className={`${filterOpen ? "block" : "hidden"} md:block w-full md:h-fit md:w-1/4 bg-amber-400 p-4 rounded-lg`}
            >
              <div className="mb-6">
                <div className="hidden md:block text-center mb-4">
                  <h2 className="text-xl font-bold">Filters</h2>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-2">Car Type</h3>
                <div className="space-y-2">
                  {carTypes.map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCarTypes.includes(type)}
                        onChange={() => toggleCarType(type)}
                        className="mr-2"
                      />
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-2">Brand</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="mr-2"
                      />
                      {brand}
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-2">Category</h3>
                <div className="space-y-2">
                  {modelCategories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="mr-2"
                      />
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-2">Availability </h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="availability"
                      checked={availabilityFilter === "all"}
                      onChange={() => setAvailabilityFilter("all")}
                      className="mr-2"
                    />
                    All
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="availability"
                      checked={availabilityFilter === "available"}
                      onChange={() => setAvailabilityFilter("available")}
                      className="mr-2"
                    />
                    Available
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="availability"
                      checked={availabilityFilter === "unavailable"}
                      onChange={() => setAvailabilityFilter("unavailable")}
                      className="mr-2"
                    />
                    Unavailable
                  </label>
                </div>
              </div>

              <button
                onClick={clearAllFilters}
                className="w-full py-2 bg-gray-900 mt-14 mb-5 hover:bg-gray-700 rounded-md"
              >
                Clear All Filters
              </button>
            </div>

            {/* Main Content */}
            <div
              className={`w-full ${filterOpen ? "ml-0 md:ml-0" : "md:w-3/4 md:ml-auto"}`}
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-amber-500">
                    Showing {filteredCars.length}{" "}
                    {filteredCars.length === 1 ? "car" : "cars"}
                  </p>
                </div>
                <div className="flex items-center text-amber-300">
                  <label htmlFor="sort" className="mr-2">
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as sortType)}
                    className="p-2 border rounded-md"
                  >
                    <option className="bg-gray-800 " value="price-low">
                      Price: Low to High
                    </option>
                    <option className="bg-gray-800 " value="price-high">
                      Price: High to Low
                    </option>
                    <option className="bg-gray-800 " value="year-new">
                      Year: Newest First
                    </option>
                    <option className="bg-gray-800 " value="year-old">
                      Year: Oldest First
                    </option>
                  </select>
                </div>
              </div>

              {filteredCars.length === 0 ? (
                <div className="text-center py-20">
                  <h3 className="text-xl font-medium mb-2">
                    No cars match your filters
                  </h3>
                  <button
                    onClick={clearAllFilters}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCars.map((car) => (
                    <CarCard
                      key={car._id}
                      _id={car._id}
                      brand={car.brand}
                      model={car.model}
                      year={car.year}
                      carType={car.carType}
                      modelCategory={car.modelCategory}
                      images={car.images}
                      rentalPrice={car.rentalPrice}
                      isAvailable={car.isAvailable}
                      forRent={car.forRent}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
