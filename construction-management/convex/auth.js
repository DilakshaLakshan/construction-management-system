import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";
import { internal } from "./_generated/api";

// Simple password hashing function (without crypto dependency)
function simpleHash(password) {
  // A very basic hash function (not secure for production)
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(16);
}

// Generate a random token without crypto
function simpleToken() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

// Register a new user
export const register = mutation({
  args: {
    email: v.string(),
    password: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existingUser) {
      throw new ConvexError("User with this email already exists");
    }

    // Hash the password using a simple hash function
    const hashedPassword = simpleHash(args.password);

    // Create the user
    const userId = await ctx.db.insert("users", {
      email: args.email,
      name: args.name,
      password: hashedPassword,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return { userId };
  },
});

// Login a user
export const login = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    // Find the user
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!user) {
      throw new ConvexError("Invalid email or password");
    }

    // Check password using the simple hash function
    const hashedPassword = simpleHash(args.password);
    
    if (user.password !== hashedPassword) {
      throw new ConvexError("Invalid email or password");
    }

    // Generate a session token
    const token = simpleToken();
    const expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days

    // Store the session
    const sessionId = await ctx.db.insert("sessions", {
      userId: user._id,
      token,
      expiresAt,
    });

    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        profilePicture: user.profilePicture,
      },
    };
  },
});

// Validate a session token
export const validateSession = query({
  args: {
    token: v.string(),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    if (!session || session.expiresAt < Date.now()) {
      return null;
    }

    const user = await ctx.db.get(session.userId);
    if (!user) {
      return null;
    }

    return {
      userId: user._id,
      email: user.email,
      name: user.name,
      profilePicture: user.profilePicture,
    };
  },
});

// Logout a user
export const logout = mutation({
  args: {
    token: v.string(),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    if (session) {
      await ctx.db.delete(session._id);
    }

    return { success: true };
  },
});
