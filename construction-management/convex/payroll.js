// convex/payroll.js
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// CREATE
export const addPayroll = mutation({
  args: {
    workerId: v.string(),
    baseSalary: v.number(),
    bonus: v.number(),
    totalPay: v.number(),
    paid: v.boolean(),
    otHours: v.number(), // New
    epf: v.number(),      // New
    etf: v.number(),      // New
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("payroll", args);
  },
});

// READ
export const getPayroll = query(async (ctx) => {
  return await ctx.db.query("payroll").collect();
});

// UPDATE
export const updatePayroll = mutation({
  args: {
    id: v.id("payroll"),
    workerId: v.string(),
    baseSalary: v.number(),
    bonus: v.number(),
    totalPay: v.number(),
    paid: v.boolean(),
    otHours: v.number(), // New
    epf: v.number(),      // New
    etf: v.number(),      // New
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    await ctx.db.patch(id, rest);
  },
});

// DELETE
export const deletePayroll = mutation({
  args: { id: v.id("payroll") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});
