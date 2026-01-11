import { db } from "./db";
import {
  products,
  contactRequests,
  subscribers,
  type Product,
  type InsertContactRequest,
  type ContactRequest,
  type InsertSubscriber,
  type Subscriber,
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createContactRequest(request: InsertContactRequest): Promise<ContactRequest>;
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
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
}

export const storage = new DatabaseStorage();
