import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getOrCreateUser = mutation({
  args: {
    address: v.string(),
    farcasterData: v.optional(v.object({
      fid: v.number(),
      username: v.string(),
      avatar: v.string(),
      displayName: v.string(),
    })),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_address", (q) => q.eq("address", args.address))
      .unique();

    if (existing) {
      if (args.farcasterData) {
        await ctx.db.patch(existing._id, {
          farcasterFid: args.farcasterData.fid,
          farcasterUsername: args.farcasterData.username,
          farcasterAvatar: args.farcasterData.avatar,
          displayName: args.farcasterData.displayName,
          lastActiveAt: Date.now(),
        });
      } else {
        await ctx.db.patch(existing._id, { lastActiveAt: Date.now() });
      }
      return existing._id;
    }

    return await ctx.db.insert("users", {
      address: args.address,
      farcasterFid: args.farcasterData?.fid,
      farcasterUsername: args.farcasterData?.username,
      farcasterAvatar: args.farcasterData?.avatar,
      displayName: args.farcasterData?.displayName ?? args.address,
      createdAt: Date.now(),
      lastActiveAt: Date.now(),
    });
  },
});

export const getUser = query({
  args: { address: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_address", (q) => q.eq("address", args.address))
      .unique();
  },
});

export const updateLastActive = mutation({
  args: { address: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_address", (q) => q.eq("address", args.address))
      .unique();
    if (user) {
      await ctx.db.patch(user._id, { lastActiveAt: Date.now() });
    }
  },
});
