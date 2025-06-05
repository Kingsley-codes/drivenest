import Link from "next/link";

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">About Us</h1>
      <p className="text-lg text-gray-700">
        We are a team dedicated to providing the best service possible. Our
        mission is to deliver quality and excellence in everything we do.
      </p>
      <p className="text-lg text-gray-700 mt-2">
        For more information, please contact us at{" "}
        <Link href="mailto:">agbamkingsley@gmail.com</Link>.
      </p>
      <p className="text-lg text-gray-700 mt-2">
        Follow us on{" "}
        <Link
          href="twitter.com/yourprofile"
          className="text-blue-500 hover:underline"
        >
          Twitter
        </Link>
        and{" "}
        <Link
          href="github.com/yourprofile"
          className="text-blue-500 hover:underline"
        >
          GitHub
        </Link>
        to stay updated with our latest news and projects.
      </p>
      <p className="text-lg text-gray-700 mt-2">
        Thank you for visiting our page!
      </p>
      <p className="text-lg text-gray-700 mt-2">
        <Link href="/" className="text-blue-500 hover:underline">
          Go back to Home
        </Link>
      </p>
      <p className="text-lg text-gray-700 mt-2">
        <Link href="/contact" className="text-blue-500 hover:underline">
          Contact Us
        </Link>
      </p>
      <p className="text-lg text-gray-700 mt-2">
        <Link href="/privacy" className="text-blue-500 hover:underline">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}
