import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    address: v.string(), // wallet address — primary identifier
    farcasterFid: v.optional(v.number()),
    farcasterUsername: v.optional(v.string()),
    farcasterAvatar: v.optional(v.string()),
    displayName: v.string(),
    createdAt: v.number(),
    lastActiveAt: v.number(),
  }).index("by_address", ["address"]),

  goals: defineTable({
    userId: v.id("users"),
    name: v.string(),
    emoji: v.string(),
    targetAmount: v.number(),
    currentAmount: v.number(),
    targetDate: v.number(),
    vault: v.string(), // "yoUSD" | "yoETH"
    status: v.string(), // "active" | "completed" | "paused"
    createdAt: v.number(),
    completedAt: v.optional(v.number()),
  }).index("by_userId", ["userId"]),

  streaks: defineTable({
    userId: v.id("users"),
    currentStreak: v.number(),
    longestStreak: v.number(),
    lastDepositDate: v.number(),
    totalDeposits: v.number(),
    weeklyHistory: v.array(v.boolean()), // last 52 weeks
  }).index("by_userId", ["userId"]),

  badges: defineTable({
    userId: v.id("users"),
    badgeType: v.string(),
    unlockedAt: v.number(),
    txHash: v.optional(v.string()),
    shared: v.boolean(),
  }).index("by_userId", ["userId"]),

  yieldCache: defineTable({
    vaultAddress: v.string(),
    apy: v.number(),
    tvl: v.number(),
    allocations: v.array(v.any()),
    cachedAt: v.number(),
  }).index("by_vault", ["vaultAddress"]),

  yieldHistory: defineTable({
    vaultAddress: v.string(),
    timestamp: v.number(),
    apy: v.number(),
  }).index("by_vault", ["vaultAddress"]),

  notifications: defineTable({
    userId: v.id("users"),
    type: v.string(),
    title: v.string(),
    message: v.string(),
    read: v.boolean(),
    createdAt: v.number(),
  }).index("by_userId", ["userId"]),

  leaderboard: defineTable({
    userId: v.id("users"),
    totalSaved: v.number(),
    totalYieldEarned: v.number(),
    currentStreak: v.number(),
    savingsScore: v.number(),
    updatedAt: v.number(),
  }).index("by_totalSaved", ["totalSaved"]),

  challenges: defineTable({
    challengerId: v.id("users"),
    challengedId: v.id("users"),
    metric: v.string(),
    duration: v.number(),
    status: v.string(), // "pending" | "active" | "completed"
    winnerId: v.optional(v.id("users")),
    startedAt: v.number(),
    endsAt: v.number(),
  }),

  shareCards: defineTable({
    userId: v.id("users"),
    type: v.string(),
    data: v.any(),
    slug: v.string(),
    createdAt: v.number(),
  }).index("by_slug", ["slug"]),
});
