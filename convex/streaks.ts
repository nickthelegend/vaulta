import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const recordDeposit = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("streaks")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .unique();

    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    const weekMs = 7 * dayMs;

    if (!existing) {
      const history = new Array(52).fill(false);
      history[0] = true;
      return await ctx.db.insert("streaks", {
        userId: args.userId,
        currentStreak: 1,
        longestStreak: 1,
        lastDepositDate: now,
        totalDeposits: 1,
        weeklyHistory: history,
      });
    }

    const diff = now - existing.lastDepositDate;
    let newStreak = existing.currentStreak;

    if (diff > weekMs) {
      newStreak = 1;
    } else {
      // Basic check: if it's a new week since last deposit, increment
      // For VAULTA we might want more complex logic, but this follows "gap > 7 days reset"
      newStreak += 1;
    }

    const newLongest = Math.max(newStreak, existing.longestStreak);
    const newHistory = [...existing.weeklyHistory];
    newHistory.shift();
    newHistory.push(true);

    await ctx.db.patch(existing._id, {
      currentStreak: newStreak,
      longestStreak: newLongest,
      lastDepositDate: now,
      totalDeposits: existing.totalDeposits + 1,
      weeklyHistory: newHistory,
    });

    return { streak: newStreak };
  },
});

export const getStreak = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("streaks")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .unique();
  },
});

export const checkStreakAtRisk = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const streak = await ctx.db
      .query("streaks")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .unique();
    if (!streak) return false;

    const diff = Date.now() - streak.lastDepositDate;
    const dayMs = 24 * 60 * 60 * 1000;
    return diff > 5 * dayMs && diff < 7 * dayMs;
  },
});
