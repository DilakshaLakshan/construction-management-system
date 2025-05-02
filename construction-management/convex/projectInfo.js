import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// CREATE a new Project Info document
export const createProjectInfo = mutation({
  args: {
    jobType: v.string(),
    jobName: v.string(),
    jobAddress: v.string(),
    projectStartDate: v.string(),
    projectEndDate: v.string(),
    contractorType: v.string(),
    notes: v.string(),
    ownerName: v.string(),
    ownerCompany: v.string(),
    ownerEmail: v.string(),
    ownerPhone: v.string(),
  },
  handler: async (ctx, args) => {
    // Insert into "projectInfo" table
    return await ctx.db.insert("projectInfo", args);
  },
});

// READ all project infos
export const getProjectInfos = query({
  handler: async (ctx) => {
    return await ctx.db.query("projectInfo").collect();
  },
});

// DELETE a project info by ID
export const deleteProjectInfo = mutation({
  args: {
    id: v.id("projectInfo"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// UPDATE a project info by ID
export const updateProjectInfo = mutation({
  args: {
    id: v.id("projectInfo"),
    jobType: v.string(),
    jobName: v.string(),
    jobAddress: v.string(),
    projectStartDate: v.string(),
    projectEndDate: v.string(),
    contractorType: v.string(),
    notes: v.string(),
    ownerName: v.string(),
    ownerCompany: v.string(),
    ownerEmail: v.string(),
    ownerPhone: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    await ctx.db.patch(id, rest);
  },
});
