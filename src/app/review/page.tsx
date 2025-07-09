export default function ReviewPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl text-center pb-3.5 text-amber-400 font-bold mb-4">
        Leave a Review
      </h1>
      <form>
        <textarea
          className="w-full h-32 p-2 border border-gray-300 rounded-md"
          placeholder="Write your review here..."
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-amber-500 text-white rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
