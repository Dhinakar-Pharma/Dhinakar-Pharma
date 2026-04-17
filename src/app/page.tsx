import Hero from "@/components/Hero";
import Manufacturing from "@/components/Manufacturing";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="flex flex-col min-h-screen">
        <Hero />
        <Manufacturing />
      </div>
    </SmoothScroll>
  );
}
