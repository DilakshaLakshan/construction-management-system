import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Add feedback
export const addFeedback = mutation({
  args: {
    buyerName: v.string(),
    buyerContact: v.string(),
    timberType: v.string(),
    quantity: v.number(),
    rating: v.number(),
    comment: v.string(),
  },
  handler: async (ctx, args) => {
    const feedbackId = await ctx.db.insert("feedback", args);
    return feedbackId;
  },
});

// Get all feedback
export const getFeedback = query({
  handler: async (ctx) => {
    return await ctx.db.query("feedback").collect();
  },
});