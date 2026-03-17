import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const checkAndAwardBadges = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const streak = await ctx.db
      .query("streaks")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .unique();
    if (!streak) return [];

    const existingBadges = await ctx.db
      .query("badges")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();

    const newBadges: any[] = [];

    const check = async (weeks: number) => {
      const type = `${weeks}week`;
      if (streak.currentStreak >= weeks && !existingBadges.some(b => b.badgeType === type)) {
        const id = await ctx.db.insert("badges", {
          userId: args.userId,
          badgeType: type,
          unlockedAt: Date.now(),
          shared: false,
        });
        newBadges.push({ id, badgeType: type });
      }
    };

    await check(4);
    await check(8);
    await check(12);
    await check(26);
    await check(52);

    return newBadges;
  },
});

export const getUserBadges = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("badges")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

export const markBadgeShared = mutation({
  args: { badgeId: v.id("badges") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.badgeId, { shared: true });
  },
});
