// components/home/SalesCollection.tsx
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import HorizontalScroll from "./HorizontalScroll";
import { SaleCar } from "../types/car";

export default function SalesCollection() {
  const [salesCars, setSalesCars] = useState<SaleCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSalesCars = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/cars?forSale=true&limit=8");
        setSalesCars(response.data);
      } catch (err) {
        console.error("Failed to fetch sales cars:", err);
        setError("Failed to load sales cars. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSalesCars();
  }, []);

  if (loading) return <div className="py-20 text-center">Loading...</div>;
  if (error)
    return <div className="py-20 text-center text-red-500">{error}</div>;

  return (
    <HorizontalScroll
      cars={salesCars}
      title="Exclusive Sales"
      subtitle="Own a piece of automotive excellence with our curated collection"
      displayMode="sale"
    />
  );
}
