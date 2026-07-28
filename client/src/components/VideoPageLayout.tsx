import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { useSEO } from "@/hooks/use-seo";

interface VideoPageLayoutProps {
  eyebrow?: string;
  title: string;
  description: string;
  path: string;
  embedUrl: string;
  testId: string;
}

export function VideoPageLayout({
  eyebrow = "Video",
  title,
  description,
  path,
  embedUrl,
  testId,
}: VideoPageLayoutProps) {
  useSEO({
    title: `${title} — Adapy Video`,
    description,
    path,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Video Library", path: "/videos" },
      { name: title, path },
    ],
    keywords: "Adapy video, adaptive mobility video, wheelchair vehicle technology video",
  });

  return (
    <div className="min-h-screen bg-background text-foreground font-sans" data-testid={testId}>
      <Navbar />
      <main className="pt-32 pb-24 md:pt-40 container mx-auto px-6 max-w-5xl">
        <header className="text-center mb-10">
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#0071e3] uppercase block mb-3">
            {eyebrow}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>
        </header>

        <div className="rounded-3xl overflow-hidden border border-black/10 shadow-2xl bg-black">
          <div className="aspect-video">
            <iframe
              src={embedUrl}
              title={title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              data-testid={`iframe-${testId}`}
            />
          </div>
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
