import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { insertContactRequestSchema, insertSubscriberSchema } from "@shared/schema";
import { registerLegacyRedirects } from "./redirects";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  registerLegacyRedirects(app);

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
        name: "Adapy Pathways",
        tagline: "Intelligence for Fleets",
        description: "Cloud platform for real-time monitoring, fleet management, reporting, and compliance documentation.",
        features: ["Fleet management", "Compliance reporting", "Predictive maintenance"],
        isFeatured: false
      }
    ]);
  }
}
