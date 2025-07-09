import Hero from "@/components/homepage/Hero";
import Introduction from "@/components/homepage/Introduction";
import RentalCollection from "@/components/homepage/RentalCollection";
import Reviews from "@/components/homepage/Reviews";
import SalesCollection from "@/components/homepage/SalesCollection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Introduction />
      <SalesCollection />
      <RentalCollection />
      <Reviews />
    </main>
  );
}
