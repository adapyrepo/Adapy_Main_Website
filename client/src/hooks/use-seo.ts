import { useEffect } from "react";

const SITE_URL = "https://adapy.com";
const SITE_NAME = "Adapy";
const DEFAULT_IMAGE = `${SITE_URL}/favicon.png`;

export interface SEOOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article" | "product";
  noindex?: boolean;
  keywords?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

function setMetaByName(name: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setMetaByProperty(property: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setJsonLd(id: string, data: Record<string, unknown> | Record<string, unknown>[]) {
  let el = document.head.querySelector<HTMLScriptElement>(`script[data-seo="${id}"]`);
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-seo", id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function removeJsonLd(id: string) {
  const el = document.head.querySelector(`script[data-seo="${id}"]`);
  if (el) el.remove();
}

export function useSEO(options: SEOOptions) {
  const {
    title,
    description,
    path,
    image = DEFAULT_IMAGE,
    type = "website",
    noindex = false,
    keywords,
    jsonLd,
  } = options;

  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    const url = path
      ? `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
      : typeof window !== "undefined"
        ? `${SITE_URL}${window.location.pathname}`
        : SITE_URL;
    const absoluteImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

    document.title = fullTitle;

    setMetaByName("description", description);
    setMetaByName("robots", noindex ? "noindex,nofollow" : "index,follow,max-image-preview:large");
    if (keywords) setMetaByName("keywords", keywords);

    setLink("canonical", url);

    setMetaByProperty("og:title", fullTitle);
    setMetaByProperty("og:description", description);
    setMetaByProperty("og:type", type);
    setMetaByProperty("og:url", url);
    setMetaByProperty("og:image", absoluteImage);
    setMetaByProperty("og:site_name", SITE_NAME);

    setMetaByName("twitter:card", "summary_large_image");
    setMetaByName("twitter:title", fullTitle);
    setMetaByName("twitter:description", description);
    setMetaByName("twitter:image", absoluteImage);

    if (jsonLd) {
      setJsonLd("page", jsonLd);
    } else {
      removeJsonLd("page");
    }

    return () => {
      removeJsonLd("page");
    };
  }, [title, description, path, image, type, noindex, keywords, JSON.stringify(jsonLd)]);
}
