import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const updateLeaderboard = mutation({
  args: {
    userId: v.id("users"),
    totalSaved: v.number(),
    totalYieldEarned: v.number(),
    currentStreak: v.number(),
    savingsScore: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("leaderboard")
      .withIndex("by_totalSaved")
      .filter(q => q.eq(q.field("userId"), args.userId))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        ...args,
        updatedAt: Date.now(),
      });
    } else {
      await ctx.db.insert("leaderboard", {
        ...args,
        updatedAt: Date.now(),
      });
    }
  },
});

export const getTopSavers = query({
  args: { limit: v.number() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("leaderboard")
      .withIndex("by_totalSaved")
      .order("desc")
      .take(args.limit);
  },
});

export const getUserRank = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const all = await ctx.db
      .query("leaderboard")
      .withIndex("by_totalSaved")
      .order("desc")
      .collect();
    
    const rank = all.findIndex(l => l.userId === args.userId);
    return rank === -1 ? null : rank + 1;
  },
});
