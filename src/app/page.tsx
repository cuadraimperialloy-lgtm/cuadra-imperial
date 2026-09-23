import Hero from "@/components/home/Hero";
import InventoryShowcase from "@/components/home/InventoryShowcase";
import BuyerGuarantees from "@/components/home/BuyerGuarantees";
import BuyingProcess from "@/components/home/BuyingProcess";
import RecentSales from "@/components/home/RecentSales";
import QuickQuote from "@/components/home/QuickQuote";

export default function Home() {
  return (
    <>
      <Hero />
      <InventoryShowcase />
      <BuyerGuarantees />
      <BuyingProcess />
      <RecentSales />
      <QuickQuote />
    </>
  );
}
