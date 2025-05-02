import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// CREATE a new materials entry
export const addMaterials = mutation({
  args: {
    clientName: v.string(),
    siteName: v.string(),
    clientLocation: v.string(),
    description: v.string(),
    totalCost: v.number(),
    payment: v.boolean(), // Include payment in create
    items: v.array(
      v.object({
        name: v.string(),
        quantity: v.number(),
        unitPrice: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("materials", args);
  },
});

// READ all materials entries
export const getMaterials = query(async (ctx) => {
  return await ctx.db.query("materials").collect();
});

// DELETE by ID
export const deleteMaterials = mutation({
  args: {
    id: v.id("materials"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// UPDATE by ID
export const updateMaterials = mutation({
  args: {
    id: v.id("materials"),
    clientName: v.string(),
    siteName: v.string(),
    clientLocation: v.string(),
    description: v.string(),
    totalCost: v.number(),
    payment: v.boolean(), // Include payment in update
    items: v.array(
      v.object({
        name: v.string(),
        quantity: v.number(),
        unitPrice: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    await ctx.db.patch(id, data);
  },
});
