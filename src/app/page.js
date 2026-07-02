import DashboardPreview from "@/components/sections/DashboardPreview";
import Hero from "@/components/sections/Hero";
import InsightFlow from "@/components/sections/InsightFlow";
import SignatureInteraction from "@/components/sections/SignatureInteraction";


export default function Home() {
  return (
    <div className="">
      <Hero/>
      <InsightFlow/>
      <DashboardPreview/>
      <SignatureInteraction/>
    </div>
  );
}
