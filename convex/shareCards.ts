import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createShareCard = mutation({
  args: {
    userId: v.id("users"),
    type: v.string(),
    data: v.any(),
  },
  handler: async (ctx, args) => {
    const slug = Math.random().toString(36).substring(2, 15);
    return await ctx.db.insert("shareCards", {
      ...args,
      slug,
      createdAt: Date.now(),
    });
  },
});

export const getShareCard = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("shareCards")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

export const getUserShareCards = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("shareCards")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();
  },
});
