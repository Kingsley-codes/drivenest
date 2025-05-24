"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import ImageUpload from "@/components/ImageUpload";

type CarType = "regular" | "luxury" | "electric";
type ModelCategory =
  | "sedan"
  | "SUV"
  | "coupe"
  | "hatchback"
  | "convertible"
  | "truck";
type ListingType = "sale" | "rent";

interface CarFormData {
  make: string;
  model: string;
  year: string;
  listingType: ListingType;
  color: string;
  carType: CarType;
  modelCategory: ModelCategory;
  salesPrice: string;
  rentalPrice: string;
  mileage: string;
  isAvailable: boolean;
  availableDate: string;
  description: string;
}

export default function AddCarPage() {
  const router = useRouter();
  const [images, setImages] = useState<(File | null)[]>([]);
  const [formData, setFormData] = useState<CarFormData>({
    make: "",
    model: "",
    year: "",
    listingType: "sale",
    color: "",
    carType: "regular",
    modelCategory: "sedan",
    salesPrice: "",
    rentalPrice: "",
    mileage: "",
    isAvailable: true,
    availableDate: "",
    description: "",
  });

  const carTypes: CarType[] = ["regular", "luxury", "electric"];
  const modelCategories: ModelCategory[] = [
    "sedan",
    "SUV",
    "coupe",
    "hatchback",
    "convertible",
    "truck",
  ];
  const years = Array.from(
    { length: 30 },
    (_, i) => new Date().getFullYear() - i
  );

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch("/api/cars/add", {
        method: "POST",
        body: formData, // Note: Don't set Content-Type header for FormData
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add car");
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Car added successfully!");
      // router.push("/dashboard/cars");
    },
    onError: (err: any) => {
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

    // Create FormData object instead of JSON
    const formDataObj = new FormData();

    // Append all form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formDataObj.append(key, value.toString());
      }
    });

    // Convert year, prices, and mileage to numbers
    formDataObj.set("year", parseInt(formData.year).toString());
    if (formData.listingType === "sale") {
      formDataObj.set("salesPrice", parseFloat(formData.salesPrice).toString());
    } else {
      formDataObj.set(
        "rentalPrice",
        parseFloat(formData.rentalPrice).toString()
      );
    }
    formDataObj.set("mileage", parseInt(formData.mileage).toString());

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
      <h1 className="text-2xl font-bold mb-6">Add New Car</h1>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="max-w-3xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Basic Information</h2>

            <div>
              <label className="block mb-1">Make*</label>
              <input
                type="text"
                name="make"
                value={formData.make}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">Model*</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">Year*</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              >
                <option value="">Select Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1">Color*</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          {/* Type & Category */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Type & Category</h2>

            <div>
              <label className="block mb-1">Listing Type*</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="listingType"
                    value="sale"
                    checked={formData.listingType === "sale"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  For Sale
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="listingType"
                    value="rent"
                    checked={formData.listingType === "rent"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  For Rent
                </label>
              </div>
            </div>

            <div>
              <label className="block mb-1">Car Type*</label>
              <select
                name="carType"
                value={formData.carType}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              >
                {carTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1">Model Category*</label>
              <select
                name="modelCategory"
                value={formData.modelCategory}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
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
          <h2 className="text-lg font-semibold mb-4">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.listingType === "sale" && (
              <div>
                <label className="block mb-1">Sales Price ($)*</label>
                <input
                  type="number"
                  name="salesPrice"
                  value={formData.salesPrice}
                  onChange={handleChange}
                  required={formData.listingType === "sale"}
                  className="w-full p-2 border rounded"
                  min="0"
                  step="0.01"
                />
              </div>
            )}

            {formData.listingType === "rent" && (
              <div>
                <label className="block mb-1">Rental Price ($/day)*</label>
                <input
                  type="number"
                  name="rentalPrice"
                  value={formData.rentalPrice}
                  onChange={handleChange}
                  required={formData.listingType === "rent"}
                  className="w-full p-2 border rounded"
                  min="0"
                  step="0.01"
                />
              </div>
            )}

            <div>
              <label className="block mb-1">Mileage</label>
              <input
                type="number"
                name="mileage"
                value={formData.mileage}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Availability</h2>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={handleChange}
                className="mr-2"
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
                  className="p-2 border rounded"
                />
              </div>
            )}
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
            className="w-full p-2 border rounded"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={mutation.isPending}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
          >
            {mutation.isPending ? "Adding..." : "Add Car"}
          </button>
        </div>
      </form>
    </div>
  );
}
