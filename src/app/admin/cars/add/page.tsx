"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import ImageUpload from "@/components/ImageUpload";
import axios from "axios";

type CarType = "regular" | "luxury" | "electric";
type ModelCategory =
  | "sedan"
  | "SUV"
  | "supercar"
  | "sports car"
  | "convertible"
  | "truck";

interface CarFormData {
  brand: string;
  model: string;
  year: string[];
  forSale: boolean;
  forRent: boolean;
  color: Array<string>;
  carType: CarType;
  modelCategory: ModelCategory;
  salesPrice: string;
  rentalPrice: string;
  mileage: string;
  isAvailable: boolean;
  inStock: boolean;
  availableDate: string;
  description: string;
}

export default function AddCarPage() {
  const [images, setImages] = useState<(File | null)[]>([]);
  const [formData, setFormData] = useState<CarFormData>({
    brand: "",
    model: "",
    year: [],
    forSale: true,
    forRent: true,
    color: [],
    carType: "regular",
    modelCategory: "sedan",
    salesPrice: "",
    rentalPrice: "",
    mileage: "",
    isAvailable: true,
    inStock: true,
    availableDate: "",
    description: "",
  });

  const carTypes: CarType[] = ["regular", "luxury", "electric"];
  const modelCategories: ModelCategory[] = [
    "sedan",
    "SUV",
    "supercar",
    "sports car",
    "convertible",
    "truck",
  ];

  // Generate years from current year to 2015
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2015 + 1 },
    (_, i) => currentYear - i
  );

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      try {
        const res = await axios.post("/api/cars/add", formData);

        return res.data;
      } catch (error: unknown) {
        // Axios wraps errors differently than fetch
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.error || "Failed to add car";
          throw new Error(message);
        }
        throw new Error("Failed to add car due to an unknown error");
      }
    },
    onSuccess: () => {
      toast.success("Car added successfully!");
      // router.push("/dashboard/cars");
    },
    onError: (err: Error) => {
      toast.error(err.message || "Something went wrong");
    },
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate at least one image is selected
    if (images.every((img) => img === null)) {
      toast.error("Please upload at least one image");
      return;
    }

    // Validate at least one listing type is selected
    if (!formData.forSale && !formData.forRent) {
      toast.error("Please select at least one listing type (Sale or Rent)");
      return;
    }

    // Validate prices based on selection
    if (formData.forSale && !formData.salesPrice) {
      toast.error("Please enter a sales price");
      return;
    }

    if (formData.forRent && !formData.rentalPrice) {
      toast.error("Please enter a rental price");
      return;
    }

    // Create FormData object instead of JSON
    const formDataObj = new FormData();

    // Append all form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          // Handle array fields (like color)
          value.forEach((item) => formDataObj.append(key, item));
        } else {
          formDataObj.append(key, value.toString());
        }
      }
    });

    // Convert numeric fields
    formData.year.forEach((y) => {
      formDataObj.append("year", y);
    });

    formDataObj.set("mileage", parseInt(formData.mileage).toString());

    if (formData.forSale) {
      formDataObj.set("salesPrice", parseFloat(formData.salesPrice).toString());
    }

    if (formData.forRent) {
      formDataObj.set(
        "rentalPrice",
        parseFloat(formData.rentalPrice).toString()
      );
    }

    // Append images
    images.forEach((image) => {
      if (image) {
        formDataObj.append("images", image);
      }
    });

    mutation.mutate(formDataObj);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-white text-center font-bold mb-6">
        Add New Car
      </h1>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="max-w-3xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Basic Information */}
          <div className="space-y-4 md:border-r md:pr-6 md:border-amber-400">
            <h2 className="text-xl text-amber-400 font-semibold">
              Basic Information
            </h2>

            <div>
              <label className="block text-lg mb-1">Brand</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
                className="w-full p-2 focus:outline-none border-amber-300 focus:border-amber-300 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-lg mb-1">Model</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
                className="w-full focus:outline-none border-amber-300 focus:border-amber-300 p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-lg mb-1">Years</label>
              <div className="grid grid-cols-4 gap-2">
                {years.map((year) => (
                  <div
                    key={year}
                    onClick={() =>
                      setFormData((prev) => {
                        const alreadySelected = prev.year.includes(
                          year.toString()
                        );
                        const updatedYears = alreadySelected
                          ? prev.year.filter((y) => y !== year.toString()) // remove if selected
                          : [...prev.year, year.toString()]; // add if not selected

                        return {
                          ...prev,
                          year: updatedYears,
                        };
                      })
                    }
                    className={`
          text-center px-3 py-2 rounded-md border cursor-pointer transition-colors
          ${
            formData.year.includes(year.toString())
              ? "bg-amber-400 text-white border-amber-400"
              : "bg-gray-800 text-amber-400 border-amber-400 hover:bg-gray-700"
          }
        `}
                  >
                    {year}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4">
              <label className="block text-lg  mb-1">Color</label>
              <div className="flex flex-wrap gap-3 pl-2">
                {["white", "black", "gray", "red", "blue"].map((color) => (
                  <div
                    key={color}
                    onClick={() => {
                      setFormData((prev) => {
                        // Toggle color selection
                        const newColor = prev.color.includes(color)
                          ? prev.color.filter((c) => c !== color) // Remove if already selected
                          : [...prev.color, color]; // Add if not selected

                        return {
                          ...prev,
                          color: newColor,
                        };
                      });
                    }}
                    className={`
                      px-2 py-1 rounded-md border cursor-pointer transition-colors
                      ${
                        formData.color.includes(color)
                          ? "bg-amber-400 text-white border-amber-400"
                          : "bg-gray-800 text-amber-400 border-amber-400 hover:bg-gray-700"
                      }
                    `}
                  >
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Type & Category */}
          <div className="space-y-4 pt-5 md:pt-0">
            <h2 className="text-xl text-amber-400 font-semibold">
              Type & Category
            </h2>

            <div>
              <label className="block text-lg mb-1">Listing Type</label>

              <div className="flex space-x-4">
                <label className="flex text-amber-300 items-center">
                  <input
                    type="checkbox"
                    name="forSale"
                    checked={formData.forSale}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const { checked } = e.target;
                      setFormData((prev) => ({
                        ...prev,
                        forSale: checked,
                        salesPrice: checked ? prev.salesPrice : "",
                      }));
                    }}
                    className="mr-2"
                  />
                  For Sale
                </label>

                <label className="flex text-amber-300 items-center">
                  <input
                    type="checkbox"
                    name="forRent"
                    checked={formData.forRent}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const { checked } = e.target;
                      setFormData((prev) => ({
                        ...prev,
                        forRent: checked,
                        rentalPrice: checked ? prev.rentalPrice : "",
                      }));
                    }}
                    className="mr-2"
                  />
                  For Rent
                </label>
              </div>
            </div>

            <div>
              <label className="block text-lg mb-1">Car Type</label>
              <select
                name="carType"
                value={formData.carType}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md bg-gray-950 focus:outline-none border-amber-300 focus:border-amber-300"
              >
                {carTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-lg mb-1">Model Category</label>
              <select
                name="modelCategory"
                value={formData.modelCategory}
                onChange={handleChange}
                required
                disabled={formData.carType === "electric"} // Disable when electric
                className={`w-full p-2 border rounded-md focus:outline-none ${
                  formData.carType === "electric"
                    ? "bg-gray-800 border-gray-600 text-gray-400"
                    : "bg-gray-950 border-amber-300 focus:border-amber-300"
                }`}
              >
                {modelCategories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-amber-400 mb-4">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`${!formData.forSale && "opacity-50"}`}>
              <label className="block mb-1">Sales Price ($)</label>
              <input
                type="number"
                name="salesPrice"
                value={formData.salesPrice}
                onChange={handleChange}
                disabled={!formData.forSale}
                required={formData.forSale}
                className="w-full focus:border-amber-300 border-amber-300 p-2 border rounded-md disabled:bg-gray-700"
                min="0"
                step="0.01"
              />
            </div>

            <div className={`${!formData.forRent && "opacity-50"}`}>
              <label className="block mb-1">Rental Price ($/day)</label>
              <input
                type="number"
                name="rentalPrice"
                value={formData.rentalPrice}
                onChange={handleChange}
                disabled={!formData.forRent}
                required={formData.forRent}
                className="w-full p-2 border rounded-md focus:border-amber-300 border-amber-300 disabled:bg-gray-700"
                min="0"
                step="0.01"
              />
            </div>

            <div className={`${!formData.forRent && "opacity-50"}`}>
              <label className="block mb-1">Mileage</label>
              <input
                type="number"
                name="mileage"
                value={formData.mileage}
                disabled={!formData.forRent}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:border-amber-300 border-amber-300"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="mb-6">
          <h2 className="text-lg text-amber-400 font-semibold mb-4">
            Availability
          </h2>
          <div className="flex items-center space-x-4 py-2">
            <div
              className={`flex items-center space-x-4 ${!formData.forRent && "opacity-50"}`}
            >
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isAvailable"
                    checked={formData.isAvailable}
                    onChange={handleChange}
                    className="mr-2 text-amber-200"
                  />
                  Currently Available
                </label>

                {!formData.isAvailable && (
                  <div>
                    <label className="block mb-1">Available From</label>
                    <input
                      type="date"
                      name="availableDate"
                      value={formData.availableDate}
                      onChange={handleChange}
                      required={!formData.isAvailable}
                      className="p-2 border rounded-md focus:border-amber-300 border-amber-300"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className={`${!formData.forSale && "opacity-50"}`}>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleChange}
                  className="mr-2 text-amber-200"
                />
                In Stock
              </label>
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="mb-6">
          <ImageUpload images={images} setImages={setImages} />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full border-amber-300 focus:outline-none focus:border-amber-300 p-2 border rounded-md"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={mutation.isPending}
            className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-400 disabled:bg-amber-300"
          >
            {mutation.isPending ? "Adding..." : "Add Car"}
          </button>
        </div>
      </form>
    </div>
  );
}
