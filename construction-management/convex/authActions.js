// Use the Node.js runtime
"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { createHash, randomBytes } from "crypto";

// Hash password using SHA-256
export const hashPassword = action({
  args: { password: v.string() },
  handler: async ({ password }) => {
    // Simple SHA-256 hashing (in production, use a proper password hashing algorithm with salt)
    return createHash("sha256").update(password).digest("hex");
  },
});

// Generate a random token for session
export const generateToken = action({
  args: {},
  handler: async () => {
    // Generate a random token using Node's crypto
    return randomBytes(32).toString('hex');
  },
});