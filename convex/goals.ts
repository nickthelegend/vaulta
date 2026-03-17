import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createGoal = mutation({
  args: {
    userId: v.id("users"),
    name: v.string(),
    emoji: v.string(),
    targetAmount: v.number(),
    targetDate: v.number(),
    vault: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("goals", {
      ...args,
      currentAmount: 0,
      status: "active",
      createdAt: Date.now(),
    });
  },
});

export const updateGoalProgress = mutation({
  args: { goalId: v.id("goals"), currentAmount: v.number() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.goalId, { currentAmount: args.currentAmount });
  },
});

export const completeGoal = mutation({
  args: { goalId: v.id("goals") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.goalId, {
      status: "completed",
      completedAt: Date.now(),
    });
  },
});

export const getUserGoals = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("goals")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

export const getActiveGoals = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("goals")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("status"), "active"))
      .collect();
  },
});
