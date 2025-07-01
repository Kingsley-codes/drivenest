// components/home/RentalCollection.tsx
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import HorizontalScroll from "./HorizontalScroll";
import { RentalCar } from "./types/car";

export default function RentalCollection() {
  const [rentalCars, setRentalCars] = useState<RentalCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRentalCars = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/cars?forRent=true&limit=8");
        setRentalCars(response.data);
      } catch (err) {
        console.error("Failed to fetch rental cars:", err);
        setError("Failed to load rental cars. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRentalCars();
  }, []);

  if (loading) return <div className="py-20 text-center">Loading...</div>;
  if (error)
    return <div className="py-20 text-center text-red-500">{error}</div>;

  return (
    <HorizontalScroll
      cars={rentalCars}
      title="Premium Rentals"
      subtitle="Experience luxury with our exclusive rental collection"
      displayMode="rental"
    />
  );
}
