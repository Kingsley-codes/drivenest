import Link from "next/link";

interface VehicleCardProps {
  id: string | number | string;
  name: string;
  type: "rental" | "sale";
  price: string;
  image?: string;
}

export default function VehicleCard({
  id,
  name,
  type,
  price,
}: VehicleCardProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="h-48 bg-gray-200 relative">
        {/* Placeholder for vehicle image */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          Vehicle Image
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500 capitalize">{type}</p>
          </div>
          <span className="font-bold text-amber-600">{price}</span>
        </div>
        <div className="mt-4 flex space-x-2">
          <Link
            href={`/vehicles/${id}`}
            className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md text-center text-sm font-medium transition-colors"
          >
            View Details
          </Link>
          <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-md text-sm font-medium transition-colors">
            {type === "rental" ? "Rent Now" : "Make Offer"}
          </button>
        </div>
      </div>
    </div>
  );
}
