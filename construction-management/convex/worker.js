// convex/worker.js
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// CREATE a new worker
export const addWorker = mutation({
  args: {
    fullName: v.string(),
    idNumber: v.string(),
    address: v.string(),
    dob: v.string(),
    gender: v.string(),
    contactNumber: v.string(),
    email: v.string(),
    qualifications: v.string(),
    experience: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("workers", args);
  },
});

// READ all workers
export const getWorkers = query({
  handler: async (ctx) => {
    return await ctx.db.query("workers").collect();
  },
});

// READ a single worker by ID
export const getWorkerById = query({
  args: {
    id: v.id("workers"),
  },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

// DELETE a worker by ID
export const deleteWorker = mutation({
  args: {
    id: v.id("workers"),
  },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});

// UPDATE worker by ID
export const updateWorker = mutation({
  args: {
    id: v.id("workers"),
    fullName: v.string(),
    idNumber: v.string(),
    address: v.string(),
    dob: v.string(),
    gender: v.string(),
    contactNumber: v.string(),
    email: v.string(),
    qualifications: v.string(),
    experience: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    return await ctx.db.patch(id, rest);
  },
});
