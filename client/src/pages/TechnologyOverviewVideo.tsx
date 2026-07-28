import { VideoPageLayout } from "@/components/VideoPageLayout";

export default function TechnologyOverviewVideo() {
  return (
    <VideoPageLayout
      eyebrow="Technology Overview"
      title="Technology Overview"
      description="A guided playlist walking through the Adapy hardware, software, and connectivity that power adaptive mobility."
      path="/technology-overview"
      embedUrl="https://www.youtube.com/embed/videoseries?list=PL9Gho2e8yP4XfK1-BoexMAiILhWo6IOqg"
      testId="page-technology-overview-video"
    />
  );
}
