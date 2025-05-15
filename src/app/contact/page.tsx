import { Card, CardContent } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold">Card Title</h3>
          <p className="text-gray-600 dark:text-gray-300">Your content here</p>
        </CardContent>
      </Card>
      <h1 className="text-2xl font-bold">Contact Us</h1>
      <p className="mt-4">We would love to hear from you!</p>
      <form className="mt-6 w-full max-w-md">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
