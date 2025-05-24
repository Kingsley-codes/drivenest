export default function DashboardPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md rounded-2xl h-72 w-full space-y-8 border border-amber-400">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-amber-400">
            Dashboard
          </h2>
        </div>
        <div className="bg-green-50 border-l-4 border-green-500 p-4">
          <div className="flex">
            <div className="text-green-500">
              <p className="text-sm">Welcome to your dashboard!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
