import { useState } from "react";
import { useRoute } from "wouter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiBlogArticleView } from "@/components/ApiBlogArticleView";
import { formatArticleDate, type ApiBlogArticle } from "@/hooks/use-blog-articles";
import { Eye, CheckCircle2, Loader2 } from "lucide-react";

interface AdminArticle extends ApiBlogArticle {
  status: string;
  publicUrl: string;
}

// Authenticated draft preview for Adapy administrators. Access requires the
// per-article preview token, which is only ever issued through the
// API-key-protected publishing endpoints — the page is useless without it.
export default function AdminBlogPreview() {
  const [, params] = useRoute("/admin/blog/:id/preview");
  const id = params?.id ?? "";
  const token = new URLSearchParams(window.location.search).get("token") ?? "";
  const queryClient = useQueryClient();
  const [publishing, setPublishing] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);

  const query = useQuery<AdminArticle>({
    queryKey: [`/api/blog/admin/articles/${id}?token=${encodeURIComponent(token)}`],
    enabled: !!id && !!token,
    retry: false,
  });
  const article = query.data;

  const publishNow = async () => {
    if (!article || publishing) return;
    if (!window.confirm(`Publish "${article.title}" to the public blog now?`)) return;
    setPublishing(true);
    setPublishError(null);
    try {
      const res = await fetch(`/api/blog/admin/articles/${id}/publish?token=${encodeURIComponent(token)}`, {
        method: "POST",
      });
      const body = await res.json();
      if (!res.ok || !body.success) {
        throw new Error(body?.error?.message ?? `HTTP ${res.status}`);
      }
      await queryClient.invalidateQueries();
    } catch (e) {
      setPublishError(e instanceof Error ? e.message : "Publishing failed.");
    } finally {
      setPublishing(false);
    }
  };

  if (!token || query.isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center px-6">
          <h1 className="text-2xl font-bold text-black mb-2">Article not found</h1>
          <p className="text-black/50">This preview link is invalid or has expired.</p>
        </div>
      </div>
    );
  }

  const isDraft = article && article.status !== "published";

  return (
    <div>
      {article && (
        <div className="sticky top-0 z-[60] bg-amber-400 text-black" data-testid="banner-admin-preview">
          <div className="container mx-auto px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-sm font-medium">
            <span className="inline-flex items-center gap-2">
              <Eye className="w-4 h-4" />
              {isDraft
                ? `Admin preview — this article is a ${article.status} and is NOT visible to the public.`
                : "This article is published and live."}
            </span>
            <span className="inline-flex items-center gap-3">
              {publishError && <span className="text-red-800">{publishError}</span>}
              {isDraft ? (
                <button
                  onClick={publishNow}
                  disabled={publishing}
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-black text-white rounded-full font-semibold hover:bg-black/80 transition-colors disabled:opacity-60"
                  data-testid="button-publish-draft"
                >
                  {publishing ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                  Publish now
                </button>
              ) : (
                <a
                  href={article.publicUrl}
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-black text-white rounded-full font-semibold hover:bg-black/80 transition-colors"
                  data-testid="link-view-live"
                >
                  View live article
                </a>
              )}
            </span>
          </div>
        </div>
      )}
      <ApiBlogArticleView
        slug={article?.slug ?? ""}
        article={article}
        isLoading={query.isLoading}
        formatDate={formatArticleDate}
      />
    </div>
  );
}
