import { HeroSection } from "@/components/HeroSection";
import { AllianceStrip } from "@/components/AllianceStrip";
import { AiMapSection } from "@/components/AiMapSection";
import { HomeLeaderboard } from "@/components/HomeLeaderboard";
import { ActivityBanner } from "@/components/ActivityBanner";

export default function Home() {
  return (
    <div className="min-h-screen pt-0">
      <HeroSection />
      <AllianceStrip />
      <AiMapSection />
      <HomeLeaderboard />
      <ActivityBanner />
    </div>
  );
}
