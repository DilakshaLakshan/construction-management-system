import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Add feedback
export const addFeedback = mutation({
  args: {
    timberType: v.string(),
    rating: v.number(),
    comment: v.string(),
  },
  handler: async (ctx, args) => {
    const feedbackData = await ctx.db.query("feedback", args)
    .filter(q=>q.eq(q.field("buyerName"), args.buyerName))
    .collect();

    if (feedbackData.length==0) 
    {
      const data = {
        timberType: args.timberType,
        rating: args.rating,
        comment: args.comment
      }
      const result = await ctx.db.insert("feedback", {
        ...data,
      });
      console.log(result);
      return result;
      
    
    }

    return feedbackData[0]
  }
});

