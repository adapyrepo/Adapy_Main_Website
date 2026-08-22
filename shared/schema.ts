import { pgTable, text, serial, integer, boolean, timestamp, json, jsonb, customType, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

const bytea = customType<{ data: Buffer; notNull: false; default: false }>({
  dataType() {
    return "bytea";
  },
});

// === TABLE DEFINITIONS ===
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  tagline: text("tagline").notNull(),
  description: text("description").notNull(),
  features: jsonb("features").array(), // Array of strings
  imageUrl: text("image_url"),
  isFeatured: boolean("is_featured").default(false),
});

export const contactRequests = pgTable("contact_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  message: text("message").notNull(),
  type: text("type").notNull(), // 'info_kit', 'demo', 'general'
  createdAt: timestamp("created_at").defaultNow(),
});

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

// connect-pg-simple creates this table for the administrator session store.
// Keeping it in the Drizzle schema prevents future schema pushes from
// misidentifying it as a renamed application table.
export const adminSessions = pgTable("admin_sessions", {
  sid: varchar("sid").primaryKey(),
  sess: json("sess").notNull(),
  expire: timestamp("expire").notNull(),
});

export const privacyRequests = pgTable("privacy_requests", {
  id: serial("id").primaryKey(),
  publicId: varchar("public_id", { length: 40 }).notNull().unique(),
  requestType: text("request_type").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  status: text("status").notNull().default("received"),
  submittedAt: timestamp("submitted_at", { withTimezone: true }).defaultNow().notNull(),
  dueAt: timestamp("due_at", { withTimezone: true }).notNull(),
  acknowledgedAt: timestamp("acknowledged_at", { withTimezone: true }),
  identityVerifiedAt: timestamp("identity_verified_at", { withTimezone: true }),
  externalActionStatus: text("external_action_status").notNull().default("not_started"),
  externalActionCompletedAt: timestamp("external_action_completed_at", { withTimezone: true }),
  dealerNotificationStatus: text("dealer_notification_status").notNull().default("not_started"),
  dealerNotificationCompletedAt: timestamp("dealer_notification_completed_at", { withTimezone: true }),
  dealerCount: integer("dealer_count"),
  completedAt: timestamp("completed_at", { withTimezone: true }),
});

export const privacyRequestEvents = pgTable("privacy_request_events", {
  id: serial("id").primaryKey(),
  privacyRequestId: integer("privacy_request_id").notNull(),
  eventType: text("event_type").notNull(),
  actorEmail: text("actor_email").notNull(),
  previousHash: varchar("previous_hash", { length: 64 }).notNull(),
  eventHash: varchar("event_hash", { length: 64 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const blogArticles = pgTable("blog_articles", {
  id: serial("id").primaryKey(),
  externalId: text("external_id").notNull().unique(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(), // sanitized HTML
  authorName: text("author_name").notNull(),
  authorDisplayName: text("author_display_name"),
  featuredImageUrl: text("featured_image_url"),
  featuredImageAlt: text("featured_image_alt"),
  featuredImageCaption: text("featured_image_caption"),
  categories: text("categories").array(),
  tags: text("tags").array(),
  seo: jsonb("seo"), // { metaTitle?, metaDescription?, keywords? }
  status: text("status").notNull(), // 'draft' | 'scheduled' | 'published'
  publishAt: timestamp("publish_at", { withTimezone: true }),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  payloadHash: text("payload_hash").notNull(),
  previewToken: varchar("preview_token", { length: 64 }).notNull().default(""),
  source: text("source").notNull().default("Adapy Back Office"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const blogImages = pgTable("blog_images", {
  id: varchar("id", { length: 64 }).primaryKey(),
  articleExternalId: text("article_external_id").notNull(),
  contentType: text("content_type").notNull(),
  data: bytea("data").notNull(),
  byteSize: integer("byte_size").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// === SCHEMAS ===
export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertContactRequestSchema = createInsertSchema(contactRequests).omit({ id: true, createdAt: true });
export const insertSubscriberSchema = createInsertSchema(subscribers).omit({ id: true, createdAt: true });

// === TYPES ===
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type ContactRequest = typeof contactRequests.$inferSelect;
export type InsertContactRequest = z.infer<typeof insertContactRequestSchema>;

export type Subscriber = typeof subscribers.$inferSelect;
export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;

export type PrivacyRequest = typeof privacyRequests.$inferSelect;
export type InsertPrivacyRequest = typeof privacyRequests.$inferInsert;

export type BlogArticle = typeof blogArticles.$inferSelect;
export type InsertBlogArticle = typeof blogArticles.$inferInsert;
export type BlogImage = typeof blogImages.$inferSelect;
