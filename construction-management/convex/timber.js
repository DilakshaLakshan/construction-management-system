import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Add new timber
export const addTimber = mutation({
  args: {
    timberType: v.string(),
    receivedDate: v.string(),
    length: v.number(),
    width: v.number(),
    height: v.number(),
    costPerUnit: v.number(),
    quantity: v.number(),
    quality: v.string(),
    receivingWay: v.string(),
    company: v.string(),
    characteristics: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const totalCost = args.length * args.width * args.height * args.quantity * args.costPerUnit;
    
    const timberId = await ctx.db.insert("timber", {
      ...args,
      totalCost,
      isSold: false,
    });
    return timberId;
  },
});

// Get all timber
export const getTimber = query({
  handler: async (ctx) => {
    return await ctx.db.query("timber").collect();
  },
});

// Get timber by ID
export const getTimberById = query({
  args: { id: v.optional(v.id("timber")) },
  handler: async (ctx, args) => {
    if (!args.id) {
      // Handle case when no ID is provided
      return null; // or return all timber, or whatever makes sense
    }
    return await ctx.db.get(args.id);
  },
});

// Update timber
export const updateTimber = mutation({
  args: {
    id: v.id("timber"),
    timberType: v.string(),
    receivedDate: v.string(),
    length: v.number(),
    width: v.number(),
    height: v.number(),
    costPerUnit: v.number(),
    quantity: v.number(),
    quality: v.string(),
    receivingWay: v.string(),
    company: v.string(),
    characteristics: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    const totalCost = rest.length * rest.width * rest.height * rest.quantity * rest.costPerUnit;
    
    await ctx.db.patch(id, {
      ...rest,
      totalCost,
    });
  },
});

// Delete timber
export const deleteTimber = mutation({
  args: { id: v.id("timber") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});