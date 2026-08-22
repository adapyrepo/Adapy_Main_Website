import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface ArticleSummary {
  id: number;
  externalId: string;
  title: string;
  slug: string;
  status: string;
  excerpt: string;
  publishedAt: string | null;
  updatedAt: string | null;
  createdAt: string;
}

interface EditorState {
  externalId: string | null; // null = new article
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  imageAlt: string;
  metaTitle: string;
  metaDescription: string;
}

const emptyEditor: EditorState = {
  externalId: null,
  title: "",
  excerpt: "",
  content: "",
  imageUrl: "",
  imageAlt: "",
  metaTitle: "",
  metaDescription: "",
};

async function api(path: string, init?: RequestInit) {
  const res = await fetch(path, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body?.error?.message || `Request failed (${res.status})`);
  return body;
}

export default function AdminBlog() {
  const { toast } = useToast();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const [editor, setEditor] = useState<EditorState | null>(null);

  useEffect(() => {
    fetch("/api/admin/me", { credentials: "include" })
      .then((r) => setAuthed(r.ok))
      .catch(() => setAuthed(false));
  }, []);

  useEffect(() => {
    if (authed) refreshList();
  }, [authed]);

  async function refreshList() {
    try {
      const body = await api("/api/admin/blog/articles");
      setArticles(body.articles);
    } catch (e: any) {
      if (String(e.message).includes("Login required")) setAuthed(false);
      else toast({ title: "Could not load articles", description: e.message, variant: "destructive" });
    }
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await api("/api/admin/login", { method: "POST", body: JSON.stringify({ email, password }) });
      setPassword("");
      setAuthed(true);
    } catch (err: any) {
      toast({ title: "Login failed", description: err.message, variant: "destructive" });
    } finally {
      setBusy(false);
    }
  }

  async function handleLogout() {
    await api("/api/admin/logout", { method: "POST" }).catch(() => {});
    setAuthed(false);
    setEditor(null);
  }

  async function openEditor(externalId: string | null) {
    if (!externalId) return setEditor({ ...emptyEditor });
    try {
      const body = await api(`/api/admin/blog/articles/${encodeURIComponent(externalId)}`);
      const a = body.article;
      setEditor({
        externalId: a.externalId,
        title: a.title ?? "",
        excerpt: a.excerpt ?? "",
        content: a.content ?? "",
        imageUrl: a.featuredImageUrl ?? "",
        imageAlt: a.featuredImageAlt ?? "",
        metaTitle: a.seo?.metaTitle ?? "",
        metaDescription: a.seo?.metaDescription ?? "",
      });
    } catch (e: any) {
      toast({ title: "Could not open article", description: e.message, variant: "destructive" });
    }
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!editor) return;
    setBusy(true);
    try {
      const payload: any = {
        title: editor.title,
        excerpt: editor.excerpt,
        content: editor.content,
        status: "published",
      };
      if (editor.imageUrl.trim()) {
        payload.featuredImage = { url: editor.imageUrl.trim(), alt: editor.imageAlt.trim() || editor.title };
      }
      if (editor.metaTitle.trim() || editor.metaDescription.trim()) {
        payload.seo = {
          ...(editor.metaTitle.trim() ? { metaTitle: editor.metaTitle.trim() } : {}),
          ...(editor.metaDescription.trim() ? { metaDescription: editor.metaDescription.trim() } : {}),
        };
      }
      const isNew = !editor.externalId;
      await api(
        isNew ? "/api/admin/blog/articles" : `/api/admin/blog/articles/${encodeURIComponent(editor.externalId!)}`,
        { method: isNew ? "POST" : "PUT", body: JSON.stringify(payload) },
      );
      toast({ title: isNew ? "Article published" : "Article updated" });
      setEditor(null);
      refreshList();
    } catch (err: any) {
      toast({ title: "Save failed", description: err.message, variant: "destructive" });
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(a: ArticleSummary) {
    if (!window.confirm(`Delete "${a.title}"? This permanently removes it from the site.`)) return;
    try {
      await api(`/api/admin/blog/articles/${encodeURIComponent(a.externalId)}`, { method: "DELETE" });
      toast({ title: "Article deleted" });
      refreshList();
    } catch (e: any) {
      toast({ title: "Delete failed", description: e.message, variant: "destructive" });
    }
  }

  if (authed === null) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Adapy Admin</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="admin-email">Email</Label>
                <Input id="admin-email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required data-testid="input-admin-email" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="admin-password">Password</Label>
                <Input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required data-testid="input-admin-password" />
              </div>
              <Button type="submit" className="w-full" disabled={busy} data-testid="button-admin-login">
                {busy ? "Signing in…" : "Sign in"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="border-b bg-background">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Blog Admin</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <a href="/admin/privacy-requests">Privacy requests</a>
            </Button>
            <Button onClick={() => openEditor(null)} data-testid="button-new-article">New article</Button>
            <Button variant="outline" onClick={handleLogout} data-testid="button-admin-logout">Sign out</Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {editor && (
          <Card>
            <CardHeader>
              <CardTitle>{editor.externalId ? "Edit article" : "New article"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="a-title">Title</Label>
                  <Input id="a-title" value={editor.title} onChange={(e) => setEditor({ ...editor, title: e.target.value })} required maxLength={300} data-testid="input-article-title" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="a-excerpt">Excerpt (shown on the blog listing)</Label>
                  <Textarea id="a-excerpt" value={editor.excerpt} onChange={(e) => setEditor({ ...editor, excerpt: e.target.value })} required maxLength={1000} rows={2} data-testid="input-article-excerpt" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="a-content">Content (HTML or Markdown)</Label>
                  <Textarea id="a-content" value={editor.content} onChange={(e) => setEditor({ ...editor, content: e.target.value })} required rows={16} className="font-mono text-sm" data-testid="input-article-content" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="a-img">Featured image URL (optional, https)</Label>
                    <Input id="a-img" type="url" value={editor.imageUrl} onChange={(e) => setEditor({ ...editor, imageUrl: e.target.value })} data-testid="input-article-image" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="a-alt">Image alt text</Label>
                    <Input id="a-alt" value={editor.imageAlt} onChange={(e) => setEditor({ ...editor, imageAlt: e.target.value })} data-testid="input-article-image-alt" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="a-mt">SEO meta title (optional)</Label>
                    <Input id="a-mt" value={editor.metaTitle} onChange={(e) => setEditor({ ...editor, metaTitle: e.target.value })} maxLength={300} data-testid="input-article-meta-title" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="a-md">SEO meta description (optional)</Label>
                    <Input id="a-md" value={editor.metaDescription} onChange={(e) => setEditor({ ...editor, metaDescription: e.target.value })} maxLength={500} data-testid="input-article-meta-description" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={busy} data-testid="button-save-article">
                    {busy ? "Saving…" : editor.externalId ? "Save changes" : "Publish article"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setEditor(null)}>Cancel</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Articles ({articles.length})</CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            {articles.length === 0 && <p className="text-muted-foreground py-4">No articles yet.</p>}
            {articles.map((a) => (
              <div key={a.externalId} className="py-3 flex items-start justify-between gap-4" data-testid={`row-article-${a.id}`}>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium truncate">{a.title}</span>
                    <Badge variant={a.status === "published" ? "default" : "secondary"}>{a.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    /blog/{a.slug}
                    {a.publishedAt ? ` · ${new Date(a.publishedAt).toLocaleDateString()}` : ""}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  {a.status === "published" && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={`/blog/${a.slug}`} target="_blank" rel="noreferrer">View</a>
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={() => openEditor(a.externalId)} data-testid={`button-edit-${a.id}`}>Edit</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(a)} data-testid={`button-delete-${a.id}`}>Delete</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
