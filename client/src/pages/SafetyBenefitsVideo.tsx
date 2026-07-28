import { VideoPageLayout } from "@/components/VideoPageLayout";

export default function SafetyBenefitsVideo() {
  return (
    <VideoPageLayout
      eyebrow="Safety Benefits"
      title="Safety Benefits"
      description="How Adapy's monitoring and safety modules protect drivers, caregivers, and equipment every trip."
      path="/safety-benefits"
      embedUrl="https://www.youtube.com/embed/evUjxSpwRFU?list=PL9Gho2e8yP4UqbI5nPbhbebY4PpuexbRY&start=82"
      testId="page-safety-benefits-video"
    />
  );
}
