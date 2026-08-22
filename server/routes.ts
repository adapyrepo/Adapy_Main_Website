import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { insertContactRequestSchema, insertSubscriberSchema } from "@shared/schema";
import { registerLegacyRedirects } from "./redirects";
import { registerBlogPublishingRoutes } from "./blogPublishing";
import { registerAdminRoutes } from "./adminAuth";
import { registerDynamicSitemaps } from "./dynamicSitemaps";

const LEAD_FORM_UPSTREAMS = {
  "qualify-form": {
    url: "https://khpbkjujudfncbmztyhh.supabase.co/functions/v1/api-lead-submit/qualify-form",
    keyEnv: "LEAD_FORM_API_KEY_QUALIFY",
  },
  dealer: {
    url: "https://khpbkjujudfncbmztyhh.supabase.co/functions/v1/api-lead-submit/dealer",
    keyEnv: "LEAD_FORM_API_KEY_DEALER",
  },
  customquote: {
    url: "https://khpbkjujudfncbmztyhh.supabase.co/functions/v1/api-lead-submit/customquote",
    keyEnv: "LEAD_FORM_API_KEY_CUSTOMQUOTE",
  },
  fleet: {
    url: "https://khpbkjujudfncbmztyhh.supabase.co/functions/v1/api-lead-submit/fleet",
    keyEnv: "LEAD_FORM_API_KEY_FLEET",
  },
} as const;

const leadProxySchema = z.object({
  formSlug: z.enum(["qualify-form", "dealer", "customquote", "fleet"]),
  payload: z.record(z.unknown()),
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  registerLegacyRedirects(app);
  registerBlogPublishingRoutes(app);
  registerAdminRoutes(app);
  registerDynamicSitemaps(app);

  app.post("/api/lead-proxy", async (req, res) => {
    let parsed;
    try {
      parsed = leadProxySchema.parse(req.body);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid lead submission." });
      }
      throw err;
    }

    const upstream = LEAD_FORM_UPSTREAMS[parsed.formSlug];
    const apiKey = process.env[upstream.keyEnv];
    if (!apiKey) {
      console.error(
        `[lead-proxy] missing env ${upstream.keyEnv} for ${parsed.formSlug}`,
      );
      return res
        .status(500)
        .json({ success: false, error: "Lead intake is not configured." });
    }

    const upstreamBody = {
      ...parsed.payload,
      _form_slug: parsed.formSlug,
      _api_key: apiKey,
    };

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "X-Form-Api-Key": apiKey,
    };
    const anonKey = process.env.VITE_SUPABASE_ANON_KEY;
    if (anonKey) {
      headers["Authorization"] = `Bearer ${anonKey}`;
      headers["apikey"] = anonKey;
    }

    try {
      const upstreamRes = await fetch(upstream.url, {
        method: "POST",
        headers,
        body: JSON.stringify(upstreamBody),
      });

      const text = await upstreamRes.text();
      let data: unknown = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = { success: false, error: "Upstream returned invalid response." };
      }
      res.status(upstreamRes.status).json(data);
    } catch (err) {
      console.error("[lead-proxy] upstream request failed", err);
      res
        .status(502)
        .json({ success: false, error: "Network request failed. Please try again." });
    }
  });

  app.get(api.products.list.path, async (req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  });

  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = insertContactRequestSchema.parse(req.body);
      const request = await storage.createContactRequest(input);
      res.status(201).json(request);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.post(api.subscribe.create.path, async (req, res) => {
    try {
      const input = insertSubscriberSchema.parse(req.body);
      const subscriber = await storage.createSubscriber(input);
      res.status(201).json(subscriber);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      // Handle unique constraint error for email
      return res.status(400).json({ message: "Email likely already subscribed" });
    }
  });

  // Seed data function
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  // One-time rename (Aug 2026): "Adapy Pathways" became "Mobility Optics".
  // Idempotent — no-op once every environment's row is renamed.
  {
    const { db } = await import("./db");
    const { products } = await import("@shared/schema");
    const { eq } = await import("drizzle-orm");
    await db.update(products).set({ name: "Mobility Optics" }).where(eq(products.name, "Adapy Pathways"));
  }

  const existingProducts = await storage.getProducts();
  if (existingProducts.length === 0) {
    const { db } = await import("./db");
    const { products } = await import("@shared/schema");
    
    await db.insert(products).values([
      {
        name: "Adapy Smart Hub",
        tagline: "The Brain of Your Vehicle",
        description: "A hardware module installed in vehicles that connects with 50+ adaptive devices.",
        features: ["Connects 50+ devices", "Real-time monitoring", "Universal compatibility"],
        isFeatured: true
      },
      {
        name: "Adapy Mobile App",
        tagline: "Total Control in Your Pocket",
        description: "Consolidates control of multiple devices into one interface - replaces multiple remotes and switches.",
        features: ["Single-app control", "Bluetooth & NFC", "User-friendly interface"],
        isFeatured: true
      },
      {
        name: "Mobility Optics",
        tagline: "Intelligence for Fleets",
        description: "Cloud platform for real-time monitoring, fleet management, reporting, and compliance documentation.",
        features: ["Fleet management", "Compliance reporting", "Predictive maintenance"],
        isFeatured: false
      }
    ]);
  }
}
