import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { useSEO } from "@/hooks/use-seo";
import { getPostBySlug, blogPosts } from "@/data/blogPosts";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug ?? "";
  const post = getPostBySlug(slug);

  useSEO({
    title: post
      ? `${post.title} | Adapy Blog`
      : "Article Not Found | Adapy Blog",
    description: post?.excerpt ?? "Read the latest from the Adapy team.",
    path: `/blog/${slug}`,
  });

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans">
        <div className="absolute top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
        <section className="pt-40 pb-32 bg-white text-center">
          <div className="container mx-auto px-6 max-w-2xl">
            <h1 className="text-4xl font-bold text-black mb-4">
              Article not found
            </h1>
            <p className="text-black/60 mb-8">
              The article you&rsquo;re looking for doesn&rsquo;t exist yet.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#0071e3] font-semibold"
              data-testid="link-back-to-blog"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to blog
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

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
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6"
              data-testid="link-back-to-blog"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to blog
            </Link>
            <span className="inline-block px-3 py-1 bg-[#0071e3] text-white text-xs font-semibold rounded-full mb-6">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] mb-6">
              {post.title}
            </h1>
            <p className="text-xl text-white/70 mb-8 leading-relaxed">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
              {post.readTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero image */}
      <section className="bg-white">
        <div className="container mx-auto px-6 max-w-5xl -mt-2">
          <div className="rounded-3xl overflow-hidden border border-black/10 shadow-2xl aspect-[16/8] bg-black/5">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
              data-testid="img-article-hero"
            />
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          {post.body ? (
            <div className="space-y-10">
              {post.body.map((block, i) => {
                if (block.type === "p") {
                  return (
                    <p
                      key={i}
                      className="text-lg leading-relaxed text-black/80"
                    >
                      {block.text}
                    </p>
                  );
                }
                if (block.type === "h2") {
                  return (
                    <h2
                      key={i}
                      className="text-3xl md:text-4xl font-bold text-black mt-4 leading-tight"
                    >
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === "h3") {
                  return (
                    <h3
                      key={i}
                      className="text-2xl font-bold text-black mt-2"
                    >
                      {block.text}
                    </h3>
                  );
                }
                if (block.type === "quote") {
                  return (
                    <blockquote
                      key={i}
                      className="border-l-4 border-[#0071e3] pl-6 py-2 text-2xl md:text-3xl font-semibold text-black/90 leading-snug"
                    >
                      {block.text}
                    </blockquote>
                  );
                }
                if (block.type === "ul") {
                  return (
                    <ul
                      key={i}
                      className="list-disc pl-6 space-y-2 text-lg text-black/80 marker:text-[#0071e3]"
                    >
                      {block.items.map((item, j) => (
                        <li key={j} className="leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (block.type === "image") {
                  return (
                    <figure
                      key={i}
                      className="my-12 -mx-6 md:mx-0"
                    >
                      <div className="rounded-2xl overflow-hidden border border-black/10 aspect-[16/9] bg-black/5">
                        <img
                          src={block.src}
                          alt={block.alt}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      {block.caption && (
                        <figcaption className="mt-3 text-sm text-black/50 text-center italic">
                          {block.caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                }
                return null;
              })}
            </div>
          ) : (
            <p className="text-lg text-black/60 italic">
              Full article coming soon.
            </p>
          )}
        </div>
      </article>

      {/* CTA */}
      <section className="py-16 bg-[#0a0a0a] text-white">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See what an integrated platform feels like
          </h2>
          <p className="text-white/60 mb-8 text-lg">
            Adapy unifies adaptive equipment from any manufacturer into one
            intelligent control system. Tell us what you drive and we&rsquo;ll
            show you what&rsquo;s possible.
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

      {/* Related */}
      {related.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-3xl font-bold text-black mb-10">
              Keep reading
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`}>
                  <article
                    className="group flex flex-col rounded-[2rem] overflow-hidden border border-black/10 hover:border-[#0071e3] hover:shadow-lg transition-all duration-300 bg-white cursor-pointer h-full"
                    data-testid={`card-related-${p.slug}`}
                  >
                    <div className="relative h-40 overflow-hidden bg-black/5">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <span className="text-xs font-semibold text-[#0071e3] uppercase tracking-wider">
                        {p.category}
                      </span>
                      <h3 className="text-lg font-bold mt-2 text-black group-hover:text-[#0071e3] transition-colors">
                        {p.title}
                      </h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
