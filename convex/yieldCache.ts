import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const upsertYieldCache = mutation({
  args: {
    vaultAddress: v.string(),
    apy: v.number(),
    tvl: v.number(),
    allocations: v.array(v.any()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("yieldCache")
      .withIndex("by_vault", (q) => q.eq("vaultAddress", args.vaultAddress))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        apy: args.apy,
        tvl: args.tvl,
        allocations: args.allocations,
        cachedAt: Date.now(),
      });
    } else {
      await ctx.db.insert("yieldCache", {
        ...args,
        cachedAt: Date.now(),
      });
    }
  },
});

export const getYieldCache = query({
  args: { vaultAddress: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("yieldCache")
      .withIndex("by_vault", (q) => q.eq("vaultAddress", args.vaultAddress))
      .unique();
  },
});

export const appendYieldHistory = mutation({
  args: { vaultAddress: v.string(), apy: v.number() },
  handler: async (ctx, args) => {
    await ctx.db.insert("yieldHistory", {
      vaultAddress: args.vaultAddress,
      apy: args.apy,
      timestamp: Date.now(),
    });
  },
});

export const getYieldHistory = query({
  args: { vaultAddress: v.string(), days: v.number() },
  handler: async (ctx, args) => {
    const startTime = Date.now() - args.days * 24 * 60 * 60 * 1000;
    return await ctx.db
      .query("yieldHistory")
      .withIndex("by_vault", (q) => q.eq("vaultAddress", args.vaultAddress))
      .filter((q) => q.gte(q.field("timestamp"), startTime))
      .collect();
  },
});
