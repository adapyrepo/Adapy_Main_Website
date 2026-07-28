import { VideoPageLayout } from "@/components/VideoPageLayout";

export default function SeeItInActionVideo() {
  return (
    <VideoPageLayout
      eyebrow="See It In Action"
      title="See It In Action"
      description="Watch the Adapy platform working in real vehicles with real adaptive equipment."
      path="/see-it"
      embedUrl="https://www.youtube.com/embed/kZqKEZl_ry4?list=PL9Gho2e8yP4UqbI5nPbhbebY4PpuexbRY"
      testId="page-see-it-video"
    />
  );
}
