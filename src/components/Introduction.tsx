import Results from "./Results";

export default function Introduction() {
  return (
    <section className="bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-amber-400 mb-4">
            Luxury in Motion: Drive the Extraordinary
          </h2>
          <p className="text-lg text-white ">
            At DriveNest, we don&apos;t just offer cars — we deliver experiences
            that define class, comfort, and thrill. Whether you&apos;re renting
            for a special weekend or looking to own a vehicle that speaks
            volumes, our handpicked collection of luxury and exotic cars is
            built to impress. From the timeless sophistication of a Rolls-Royce
            to the pulse-quickening power of a Ferrari, DriveNest connects you
            to the world&apos;s most coveted machines. We&apos;re here for those
            who value performance, precision, and presence — for those who move
            differently. Rent it. Own it. Either way, arrive in style, command
            attention, and enjoy the drive.
          </p>
        </div>
        <div className="flex justify-center gap-8">
          <Results />
        </div>
      </div>
    </section>
  );
}
