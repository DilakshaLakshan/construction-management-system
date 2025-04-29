import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const addFeedback = mutation({
  args: {
    timberType: v.string(),
    rating: v.number(),
    comment: v.string(),
    quantity: v.number(),
    buyerName: v.optional(v.string()),
    buyerContact: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    // Insert all provided data at once
    const result = await ctx.db.insert("feedback", {
      timberType: args.timberType,
      rating: args.rating,
      comment: args.comment,
      quantity: args.quantity,
      buyerName: args.buyerName,
      buyerContact: args.buyerContact
    });
    
    return result; // Returns the new document ID
  }
});
