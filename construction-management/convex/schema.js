import { defineSchema, defineTable } from "convex/server";  // ✅ Correct import!
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    createdAt: v.float64(),
    email: v.string(),
    name: v.string(),
    passwordHash: v.string(),
    role: v.string(),
    credits: v.number(),
    subscriptionId: v.optional(v.string()),
  }),

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
