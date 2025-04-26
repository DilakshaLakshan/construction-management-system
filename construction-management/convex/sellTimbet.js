import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Sell timber
export const sellTimber = mutation({
  args: {
    id: v.id("timber"),
    sellingPrice: v.number(),
    discountRate: v.number(),
    buyerName: v.string(),
    buyerContact: v.string(),
  },
  handler: async (ctx, args) => {
    const timber = await ctx.db.get(args.id);
    if (!timber) throw new Error("Timber not found");
    
    const volume = timber.length * timber.width * timber.height * timber.quantity;
    const finalCost = volume * args.sellingPrice * (1 - args.discountRate / 100);
    
    await ctx.db.patch(args.id, {
      sellingPrice: args.sellingPrice,
      discountRate: args.discountRate,
      buyerName: args.buyerName,
      buyerContact: args.buyerContact,
      finalCost,
      isSold: true,
    });
  },
});

// Get sold timber
export const getSoldTimber = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("timber")
      .filter(q => q.eq(q.field("isSold"), true))
      .collect();
  },
});