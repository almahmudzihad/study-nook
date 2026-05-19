import Hero from "@/Components/home/Hero";
import HowItWorks from "@/Components/home/HowItWorks";
import LatestRooms from "@/Components/home/LatestRooms";
import WhyChoose from "@/Components/home/WhyChoose";


export default function Home() {
  return (
    <div>
      <Hero />
      <LatestRooms />
      <WhyChoose />
      <HowItWorks />
    </div>
  );
}
