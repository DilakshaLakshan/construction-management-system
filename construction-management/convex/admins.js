// convex/admins.js
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const checkAdminCredentials = mutation({
  args: {
    username: v.string(),
    password: v.string(),
  },
  handler: async (ctx, { username, password }) => {
    // Query the "admins" table for a user with the given username/password
    const adminUser = await ctx.db
      .query("admins")
      .filter((q) => q.eq(q.field("username"), username))
      .filter((q) => q.eq(q.field("password"), password))
      .first();

    // If found, return true; otherwise false
    return Boolean(adminUser);
  },
});
