import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { useSEO } from "@/hooks/use-seo";

const PLAYLIST = "PL9Gho2e8yP4XfK1-BoexMAiILhWo6IOqg";

const videoIds = [
  "eCS75jukZ_o",
  "mcJClvgaYT4",
  "5sHmdjmKSOI",
  "Wey_IJneU40",
  "jzWj_PyKXZ0",
  "nFdi3fUmPPw",
  "U5pMg1baSBA",
  "dWPAmzsKWhU",
];

export default function TechnologyOverviewVideo() {
  useSEO({
    title: "Technology Overview — Adapy Video",
    description:
      "A video series walking through the Adapy hardware, software, and connectivity that power adaptive mobility.",
    path: "/technology-overview",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Video Library", path: "/videos" },
      { name: "Technology Overview", path: "/technology-overview" },
    ],
    keywords:
      "Adapy technology overview, adaptive mobility technology video, wheelchair vehicle smart hub video",
  });

  const [featured, ...rest] = videoIds;

  return (
    <div
      className="min-h-screen bg-background text-foreground font-sans"
      data-testid="page-technology-overview-video"
    >
      <Navbar />
      <main className="pt-32 pb-24 md:pt-40 container mx-auto px-6 max-w-6xl">
        <header className="text-center mb-10">
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#0071e3] uppercase block mb-3">
            Technology Overview
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Technology Overview
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A video series walking through the Adapy hardware, software, and
            connectivity that power adaptive mobility.
          </p>
        </header>

        <div className="rounded-3xl overflow-hidden border border-black/10 shadow-2xl bg-black mb-10">
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${featured}?list=${PLAYLIST}`}
              title="Technology Overview — featured video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              data-testid="iframe-tech-overview-featured"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((id, i) => (
            <div
              key={id}
              className="rounded-2xl overflow-hidden border border-black/10 shadow-lg bg-black"
            >
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${id}?list=${PLAYLIST}`}
                  title={`Technology Overview — video ${i + 2}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  data-testid={`iframe-tech-overview-${i + 2}`}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/videos"
            className="inline-flex items-center gap-2 text-[#0071e3] font-medium hover:underline"
            data-testid="link-back-video-library"
          >
            <ArrowLeft className="w-4 h-4" />
            Browse the full Video Library
          </Link>
          <span className="hidden sm:inline text-black/20">|</span>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-black/60 hover:text-black font-medium transition-colors"
            data-testid="link-video-contact"
          >
            Questions? Contact us
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
