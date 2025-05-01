import { defineSchema, defineTable } from "convex/server";  // ✅ Correct import!
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.string(),
    password: v.string(), // This will be hashed
    profilePicture: v.optional(v.string()),
    role: v.optional(v.string()),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    company: v.optional(v.string()),
    bio: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_email", ["email"]),
  
  sessions: defineTable({
    userId: v.id("users"),
    token: v.string(),
    expiresAt: v.number(),
  }).index("by_token", ["token"]),

  timber: defineTable({
    timberType: v.string(),
    receivedDate: v.string(),
    length: v.number(),
    width: v.number(),
    height: v.number(),
    costPerUnit: v.number(),
    quantity: v.number(),
    totalCost: v.number(),
    quality: v.string(),
    receivingWay: v.string(),
    company: v.string(),
    characteristics: v.string(),
    sellingPrice: v.number(),
    discountRate: v.number(),
    buyerName: v.string(),
    buyerContact: v.string(),
    finalCost: v.number(),
    createdAt: v.number(),
  }),
  
  feedback: defineTable({
    buyerName: v.optional( v. string()),
    buyerContact: v.optional( v. string()),
    timberType: v.string(),
    quantity: v.optional(v.number()),
    rating: v.number(),
    comment: v.string(),
  })
    
});
