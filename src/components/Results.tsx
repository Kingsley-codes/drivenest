"use client";

import { useEffect, useState } from "react";
import { ResultCard, CardContent } from "@/components/ui/ResultCard";

const Counter = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    const duration = 2000;
    const increment = Math.ceil(end / (duration / 50));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [target]);

  return <h2 className="text-4xl font-bold pb-2">{count.toLocaleString()}+</h2>;
};

export default function Results() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl text-amber-400 font-bold text-center my-8">
        Our Confidence Is In Our Results
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-6">
        <ResultCard className="text-center px-4 py-9 border border-amber-500 w-80 h-56">
          <CardContent>
            <Counter target={130} />
            <p className="text-2xl text-white">Cars Sold</p>
          </CardContent>
        </ResultCard>

        <ResultCard className="text-center px-4 py-9 border border-amber-500 w-80 h-56">
          <CardContent>
            <Counter target={210} />
            <p className="text-2xl text-white">Cars Rented</p>
          </CardContent>
        </ResultCard>

        <ResultCard className="text-center px-4 py-9 border border-amber-500 w-80 h-56">
          <CardContent>
            <Counter target={300} />
            <p className="text-2xl text-white">Satisfied Customers</p>
          </CardContent>
        </ResultCard>
      </div>
    </div>
  );
}
