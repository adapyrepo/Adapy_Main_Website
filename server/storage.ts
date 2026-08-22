import { db } from "./db";
import {
  products,
  contactRequests,
  subscribers,
  privacyRequests,
  type Product,
  type InsertContactRequest,
  type ContactRequest,
  type InsertSubscriber,
  type Subscriber,
  type InsertPrivacyRequest,
  type PrivacyRequest,
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createContactRequest(request: InsertContactRequest): Promise<ContactRequest>;
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  createPrivacyRequest(request: InsertPrivacyRequest): Promise<PrivacyRequest>;
}

export class DatabaseStorage implements IStorage {
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createContactRequest(request: InsertContactRequest): Promise<ContactRequest> {
    const [newRequest] = await db.insert(contactRequests).values(request).returning();
    return newRequest;
  }

  async createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber> {
    const [newSubscriber] = await db.insert(subscribers).values(subscriber).returning();
    return newSubscriber;
  }

  async createPrivacyRequest(request: InsertPrivacyRequest): Promise<PrivacyRequest> {
    const [newRequest] = await db.insert(privacyRequests).values(request).returning();
    return newRequest;
  }
}

export const storage = new DatabaseStorage();
