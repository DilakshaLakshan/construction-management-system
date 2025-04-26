import { defineSchema, defineTable } from "convex/server";  // ✅ Correct import!
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    createdAt: v.number(),
  }),
});
