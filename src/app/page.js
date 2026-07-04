import DashboardPreview from "@/components/sections/DashboardPreview";
import DashboardSection from "@/components/sections/DashboardSection";
import Hero from "@/components/sections/Hero";
import HeroSection from "@/components/sections/HeroSection";
import InsightFlow from "@/components/sections/InsightFlow";
import InsightFlowSection from "@/components/sections/InsightFlowSection";
import SignatureInteraction from "@/components/sections/SignatureInteraction";
import WowSection from "@/components/sections/WowSection";
import Navbar from "@/components/ui/Navbar";


export default function Home() {
  return (
    <div className="">
      {/* <Hero/> */}
      {/* <InsightFlow/> */}
      {/* <DashboardPreview/> */}
      {/* <SignatureInteraction/> */}
      <Navbar/>
      <HeroSection/>
      <InsightFlowSection/>
      <DashboardSection/>
      <WowSection/>
    </div>
  );
}
