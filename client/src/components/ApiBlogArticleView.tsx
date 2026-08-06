import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { useSEO } from "@/hooks/use-seo";
import type { ApiBlogArticle } from "@/hooks/use-blog-articles";

interface Props {
  slug: string;
  article: ApiBlogArticle | undefined;
  isLoading: boolean;
  formatDate: (iso: string) => string;
}

// Renders an article published through the Back Office API using the same
// visual design as the hand-written blog posts. Content HTML is sanitized
// server-side before it is ever stored.
export function ApiBlogArticleView({ slug, article, isLoading, formatDate }: Props) {
  useSEO({
    title: article
      ? `${article.seo?.metaTitle || article.title} | Adapy Blog`
      : "Adapy Blog",
    description:
      article?.seo?.metaDescription || article?.excerpt || "Read the latest from the Adapy team.",
    path: `/blog/${slug}`,
    breadcrumbs: article
      ? [
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: article.title, path: `/blog/${slug}` },
        ]
      : undefined,
    type: article ? "article" : "website",
    image: article?.featuredImage?.url ?? undefined,
    noindex: !article,
    keywords: article?.seo?.keywords?.join(", "),
    jsonLd: article
      ? {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: article.title,
          description: article.excerpt,
          image: article.featuredImage?.url ?? undefined,
          datePublished: article.publishedAt,
          dateModified: article.publishedAt,
          author: { "@type": "Organization", name: article.author },
          publisher: {
            "@type": "Organization",
            name: "Adapy",
            logo: { "@type": "ImageObject", url: "https://adapy.com/favicon.png" },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://adapy.com/blog/${slug}`,
          },
          articleSection: article.categories?.[0],
        }
      : undefined,
  });

  if (isLoading && !article) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans">
        <div className="absolute top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
        <section className="pt-40 pb-32 bg-white text-center">
          <div className="container mx-auto px-6 max-w-2xl">
            <p className="text-black/40">Loading article…</p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (!article) return null;

  const category = article.categories?.[0] ?? "Industry Insights";

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Hero */}
      <section className="relative pt-32 pb-12 bg-gradient-to-b from-black to-[#0a0a0a] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#0071e3] blur-[150px] rounded-full" />
        </div>
        <div className="container mx-auto px-6 relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] mb-6">
              {article.title}
            </h1>
            <p className="text-xl text-white/70 mb-8 leading-relaxed">{article.excerpt}</p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {article.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(article.publishedAt)}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero image */}
      {article.featuredImage?.url && (
        <section className="bg-white">
          <div className="container mx-auto px-6 max-w-5xl pt-10 md:pt-14">
            <figure>
              <div className="rounded-3xl overflow-hidden border border-black/10 shadow-2xl aspect-[16/8] bg-black/5">
                <img
                  src={article.featuredImage.url}
                  fetchPriority="high"
                  decoding="async"
                  alt={article.featuredImage.alt ?? article.title}
                  className="w-full h-full object-cover"
                  data-testid="img-article-hero"
                />
              </div>
              {article.featuredImage.caption && (
                <figcaption className="mt-3 text-sm text-black/50 text-center italic">
                  {article.featuredImage.caption}
                </figcaption>
              )}
            </figure>
          </div>
        </section>
      )}

      {/* Article header strip */}
      <section className="bg-white">
        <div className="container mx-auto px-6 max-w-3xl pt-8 md:pt-10">
          <div className="flex items-center justify-between gap-4 pb-6 border-b border-black/10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-black/60 hover:text-[#0071e3] text-sm font-medium transition-colors"
              data-testid="link-back-to-blog"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to blog
            </Link>
            <span className="inline-block px-3 py-1 bg-[#0071e3] text-white text-xs font-semibold rounded-full">
              {category}
            </span>
          </div>
        </div>
      </section>

      {/* Body — server-sanitized HTML */}
      <article className="py-16 bg-white">
        <div
          className="container mx-auto px-6 max-w-3xl api-article-body space-y-8 text-lg leading-relaxed text-black/80
            [&_h2]:text-3xl [&_h2]:md:text-4xl [&_h2]:font-bold [&_h2]:text-black [&_h2]:mt-4 [&_h2]:leading-tight
            [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-black [&_h3]:mt-2
            [&_blockquote]:border-l-4 [&_blockquote]:border-[#0071e3] [&_blockquote]:pl-6 [&_blockquote]:py-2 [&_blockquote]:text-2xl [&_blockquote]:font-semibold [&_blockquote]:text-black/90 [&_blockquote]:leading-snug
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:marker:text-[#0071e3]
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:marker:text-[#0071e3]
            [&_a]:text-[#0071e3] [&_a]:underline [&_a]:underline-offset-2
            [&_img]:rounded-2xl [&_img]:border [&_img]:border-black/10 [&_img]:w-full
            [&_figcaption]:text-sm [&_figcaption]:text-black/50 [&_figcaption]:text-center [&_figcaption]:italic [&_figcaption]:mt-3
            [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-black/10 [&_th]:p-3 [&_th]:bg-black/5 [&_td]:border [&_td]:border-black/10 [&_td]:p-3"
          dangerouslySetInnerHTML={{ __html: article.content ?? "" }}
          data-testid="api-article-body"
        />
      </article>

      {/* CTA */}
      <section className="py-16 bg-[#0a0a0a] text-white">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See what an integrated platform feels like
          </h2>
          <p className="text-white/60 mb-8 text-lg">
            Adapy unifies adaptive equipment from any manufacturer into one intelligent
            control system. Tell us what you drive and we&rsquo;ll show you what&rsquo;s possible.
          </p>
          <Link
            href="/user-funnel"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#0071e3] text-white rounded-full font-bold hover:bg-[#0077ed] transition-all"
            data-testid="link-cta-user-funnel"
          >
            See If Adapy Could Help
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
