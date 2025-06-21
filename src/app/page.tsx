import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import RentalCollection from "@/components/RentalCollection";
import SalesCollection from "@/components/SalesCollection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Introduction />
      <SalesCollection />
      <RentalCollection />
      {/* reviews */}
    </main>
  );
}
