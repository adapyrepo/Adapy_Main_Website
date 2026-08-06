import { useQuery } from "@tanstack/react-query";

export interface ApiBlogArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  featuredImage: { url: string | null; alt: string | null; caption: string | null };
  categories: string[];
  tags: string[];
  seo: { metaTitle?: string; metaDescription?: string; keywords?: string[] };
  publishedAt: string;
}

export function useApiBlogArticles() {
  return useQuery<ApiBlogArticle[]>({
    queryKey: ["/api/blog/articles"],
    staleTime: 5 * 60 * 1000,
  });
}

export function useApiBlogArticle(slug: string, enabled: boolean) {
  return useQuery<ApiBlogArticle>({
    queryKey: [`/api/blog/articles/${slug}`],
    enabled,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

export function formatArticleDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}
