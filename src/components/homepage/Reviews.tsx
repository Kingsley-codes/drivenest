export default function Reviews() {
  return (
    <div className="w-full mx-auto p-10 bg-gray-900">
      <h2 className="text-3xl text-center text-amber-400 font-bold mb-4">
        Customer Reviews
      </h2>

      <p className="text-center text-gray-200 text-lg mb-8">
        Don&apos;t just take our word for it. See what our customers are saying
        about their experiences with Drivenest.
      </p>

      <div className="space-y-4">
        {/* Example Review */}
        <div className="p-4 border rounded-lg">
          <h3 className="font-bold">John Doe</h3>
          <p className="text-gray-600">
            &quot;Great service and amazing cars!&quot;
          </p>
          <div className="flex items-center mt-2">
            <span className="text-yellow-500">★★★★★</span>
          </div>
        </div>
        {/* Add more reviews as needed */}
      </div>
    </div>
  );
}
