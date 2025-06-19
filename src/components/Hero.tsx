"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CldImage } from "next-cloudinary";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    media: "lsntidemkzy6x1bpzpio",
    type: "video" as const,
    header: "Experience Luxury in Motion",
    caption: "Drive the epitome of luxury—where prestige meets perfection.",
  },
  {
    id: 2,
    media: "jj4cgofyzpzcyk8sr3qm",
    type: "video" as const,
    header: "Ignite Your Senses",
    caption: "Feel the adrenaline. Rent or drive home a legend today.",
  },
  {
    id: 3,
    media: "p7bogswk1wtiz813lhir",
    type: "image" as const,
    header: "Make Every Arrival Count",
    caption: "Experience the pinnacle of automotive excellence.",
  },
  {
    id: 4,
    media: "hznh6bwydofl3rbrtidf",
    type: "video" as const,
    header: "Unmatched Elegance, Unrivaled Performance",
    caption: "Command every journey in style and sophistication.",
  },
  {
    id: 5,
    media: "otl80hxqkjg6e0w9usz0",
    type: "image" as const,
    header: "Drive What Turns Heads",
    caption:
      "Rent or own the world's most luxurious cars. For those who move differently.",
  },
  {
    id: 6,
    media: "rghe4dpmoqel1aqs8lyo",
    type: "video" as const,
    header: "Your Dream Car Awaits",
    caption:
      "Rent or own the finest selection of luxury vehicles. Start your journey now.",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {slides.map(
          (slide, index) =>
            index === currentSlide && (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                {slide.type === "image" ? (
                  <CldImage
                    src={slide.media}
                    alt={slide.header}
                    fill
                    priority
                    sizes="100vw"
                    className="absolute inset-0 object-cover"
                    quality="auto"
                    format="auto"
                  />
                ) : (
                  <div className="absolute inset-0 w-full h-full">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                      src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/${slide.media}.mp4`}
                    />
                  </div>
                )}

                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-4xl md:text-6xl font-bold mb-4"
                  >
                    {slide.header}
                  </motion.h1>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-xl md:text-2xl mb-8 max-w-2xl"
                  >
                    {slide.caption}
                  </motion.p>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="flex gap-4"
                  >
                    <button className="px-8 py-3 bg-amber-500 hover:bg-amber-600 rounded-lg font-semibold transition-all">
                      Rent Now
                    </button>
                    <button className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-black rounded-lg font-semibold transition-all">
                      Browse Collection
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? "bg-white w-6" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
