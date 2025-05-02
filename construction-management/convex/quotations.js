import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// List all quotations
export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("quotations").collect();
  },
});

// Get a single quotation by ID
export const get = query({
  args: { id: v.id("quotations") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Create a new quotation
export const create = mutation({
  args: {
    clientName: v.string(),
    clientEmail: v.optional(v.string()),
    clientPhone: v.optional(v.string()),
    projectName: v.string(),
    projectLocation: v.string(),
    projectType: v.string(),
    startDate: v.string(),
    estimatedCompletionDate: v.string(),
    description: v.optional(v.string()),
    items: v.array(
      v.object({
        description: v.string(),
        quantity: v.number(),
        unitPrice: v.number(),
        total: v.number(),
      })
    ),
    subtotal: v.number(),
    taxRate: v.number(),
    taxAmount: v.number(),
    discount: v.number(),
    total: v.number(),
    notes: v.optional(v.string()),
    terms: v.string(),
    createdAt: v.string(),
    status: v.string(),
    // Make these fields truly optional by providing default values
    cadFileUrl: v.optional(v.string()),
    cadFileName: v.optional(v.string()),
    cadExtractedQuantities: v.optional(
      v.object({
        walls: v.optional(v.number()),
        doors: v.optional(v.number()),
        windows: v.optional(v.number()),
        floors: v.optional(v.number()),
        beams: v.optional(v.number()),
        columns: v.optional(v.number()),
        area: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    // Ensure cadExtractedQuantities is an object even if not provided
    const safeArgs = {
      ...args,
      cadExtractedQuantities: args.cadExtractedQuantities || {},
    };
    
    const quotationId = await ctx.db.insert("quotations", safeArgs);
    return quotationId;
  },
});

// Update an existing quotation
export const update = mutation({
  args: {
    id: v.id("quotations"),
    clientName: v.string(),
    clientEmail: v.optional(v.string()),
    clientPhone: v.optional(v.string()),
    projectName: v.string(),
    projectLocation: v.string(),
    projectType: v.string(),
    startDate: v.string(),
    estimatedCompletionDate: v.string(),
    description: v.optional(v.string()),
    items: v.array(
      v.object({
        description: v.string(),
        quantity: v.number(),
        unitPrice: v.number(),
        total: v.number(),
      })
    ),
    subtotal: v.number(),
    taxRate: v.number(),
    taxAmount: v.number(),
    discount: v.number(),
    total: v.number(),
    notes: v.optional(v.string()),
    terms: v.string(),
    status: v.string(),
    cadFileUrl: v.optional(v.string()),
    cadFileName: v.optional(v.string()),
    cadExtractedQuantities: v.optional(
      v.object({
        walls: v.optional(v.number()),
        doors: v.optional(v.number()),
        windows: v.optional(v.number()),
        floors: v.optional(v.number()),
        beams: v.optional(v.number()),
        columns: v.optional(v.number()),
        area: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    // Ensure cadExtractedQuantities is an object even if not provided
    const safeUpdates = {
      ...updates,
      cadExtractedQuantities: updates.cadExtractedQuantities || {},
    };
    
    await ctx.db.patch(id, safeUpdates);
    return id;
  },
});

// Delete a quotation
export const deleteQuotation = mutation({
  args: { id: v.id("quotations") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});

// Update quotation status
export const updateStatus = mutation({
  args: {
    id: v.id("quotations"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
    return args.id;
  },
});

// Process CAD file and extract quantities (mock implementation)
export const processCadFile = mutation({
  args: {
    quotationId: v.id("quotations"),
    fileUrl: v.string(),
    fileName: v.string(),
  },
  handler: async (ctx, args) => {
    // Mock extracted data
    const mockExtractedData = {
      walls: Math.floor(Math.random() * 50) + 10,
      doors: Math.floor(Math.random() * 15) + 5,
      windows: Math.floor(Math.random() * 20) + 8,
      floors: Math.floor(Math.random() * 5) + 1,
      beams: Math.floor(Math.random() * 30) + 15,
      columns: Math.floor(Math.random() * 20) + 10,
      area: (Math.random() * 500 + 100).toFixed(2)
    };
    
    // Update the quotation with the extracted data
    await ctx.db.patch(args.quotationId, {
      cadFileUrl: args.fileUrl,
      cadFileName: args.fileName,
      cadExtractedQuantities: mockExtractedData
    });
    
    return mockExtractedData;
  },
});
