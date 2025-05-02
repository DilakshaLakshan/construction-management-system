import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";

// Get user profile
export const getProfile = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new ConvexError("User not found");
    }

    // Don't return the password
    const { password, ...userProfile } = user;
    return userProfile;
  },
});

// Update user profile
export const updateProfile = mutation({
  args: {
    userId: v.id("users"),
    name: v.optional(v.string()),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    company: v.optional(v.string()),
    bio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { userId, ...updates } = args;
    
    // Check if user exists
    const user = await ctx.db.get(userId);
    if (!user) {
      throw new ConvexError("User not found");
    }

    // Update the user
    await ctx.db.patch(userId, {
      ...updates,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Update profile picture
export const updateProfilePicture = mutation({
  args: {
    userId: v.id("users"),
    profilePicture: v.string(),
  },
  handler: async (ctx, args) => {
    const { userId, profilePicture } = args;
    
    // Check if user exists
    const user = await ctx.db.get(userId);
    if (!user) {
      throw new ConvexError("User not found");
    }

    // Update the profile picture
    await ctx.db.patch(userId, {
      profilePicture,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Delete profile picture
export const deleteProfilePicture = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const { userId } = args;
    
    // Check if user exists
    const user = await ctx.db.get(userId);
    if (!user) {
      throw new ConvexError("User not found");
    }

    // Remove the profile picture
    await ctx.db.patch(userId, {
      profilePicture: null,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});