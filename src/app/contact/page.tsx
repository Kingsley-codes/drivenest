"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CldImage } from "next-cloudinary";
import { IoMdTime } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosStarOutline } from "react-icons/io";
import { AiOutlineDollarCircle } from "react-icons/ai";

export default function ContactPage() {
  return (
    <div className="flex flex-col mt-7 items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl pt-7 md:text-5xl text-amber-400 font-bold">
        Contact Us
      </h1>
      <p className="mt-4 mb-10 md:text-lg text-amber-400">
        We would love to hear from you!
      </p>

      <div className="md:flex md:justify-center mt-5 max-w-7xl mx-auto p-4">
        <Card className="mb-4 md:w-1/4 md:mb-2 bg-amber-400 hover:bg-amber-300 border-2 mx-4 border-amber-400">
          <CardContent>
            <div className="flex items-center justify-center mb-3">
              <AiOutlineDollarCircle className="text-3xl text-gray-900" />
            </div>
            <h3 className="text-lg mb-3 md:text-xl text-center text-gray-900 font-semibold">
              Instant Quote Online
            </h3>
            <p className="text-gray-700 text-center">
              Choose the perfect car for your needs and get an instant quote
              online.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-4 md:mb-2 md:w-1/4 bg-amber-400 hover:bg-amber-300 border-2 mx-4 border-amber-400">
          <CardContent>
            <div className="flex items-center justify-center mb-3">
              <IoIosStarOutline className="text-3xl text-gray-900" />
            </div>
            <h3 className="text-lg mb-3 md:text-xl text-center text-gray-900 font-semibold">
              Excellent Reviews
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Our customers love us! Check out our reviews to see why we are the
              best choice for your car rentals and sales needs.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-4 md:mb-2 md:w-1/4 bg-amber-400 hover:bg-amber-300 border-2 mx-4 border-amber-400">
          <CardContent>
            <div className="flex items-center justify-center mb-3">
              <IoLocationOutline className="text-3xl text-gray-900" />
            </div>
            <h3 className="text-lg mb-3 md:text-xl text-center text-gray-900 font-semibold">
              Visit Us
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              123 Main Street, <br />
              Cityville, ST 12345 <br />
              Phone: (123) 456-7890 <br />
              Email: sdcdhbl@email.com
            </p>
          </CardContent>
        </Card>

        <Card className="mb-4 md:mb-2 md:w-1/4 bg-amber-400 hover:bg-amber-300 border-2 mx-4 border-amber-400">
          <CardContent>
            <div className="flex items-center justify-center mb-3">
              <IoMdTime className="text-3xl text-gray-900" />
            </div>
            <h3 className="text-lg mb-3 md:text-xl text-center text-gray-900 font-semibold">
              Our Hours
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Monday to Friday: 08:00 - 18:00 <br />
              Saturday: 08:00 - 13:00 Closed <br />
              Sundays and public holidays <br /> <br />
              (Online booking available 24/7)
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="md:flex w-full mx-10 my-9 bg-amber-400 px-3 rounded-3xl md:rounded-bl-full md:rounded-tr-full py-6 justify-between">
        <form className="mt-6 w-full px-6 ml-14 border border-gray-950 rounded-3xl max-w-md">
          <div className="mb-4 mt-6">
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
              className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md 
               shadow-sm focus:outline-none focus:bg-amber-300  text-gray-900 focus:ring focus:ring-gray-500"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md 
               shadow-sm focus:outline-none focus:bg-amber-300  text-gray-900 focus:ring focus:ring-gray-500"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-900 rounded-md 
               shadow-sm focus:outline-none text-gray-900 focus:bg-amber-300 focus:ring focus:ring-gray-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full px-4 mb-7 py-2 font-semibold text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
          >
            Send Message
          </button>
        </form>

        {/* Image container - takes 2/5 on larger screens */}
        <div className="md:w-3/7 w-full mt-5 md:mt-0 flex p-3 md:pr-2">
          <div className="relative w-full h-full min-h-[300px] lg:min-h-[auto]">
            <CldImage
              src="uxn81mvwzzolzwpj3zk9"
              alt="Your luxurious car rental"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
