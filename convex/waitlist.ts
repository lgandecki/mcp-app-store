import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addToWaitlist = mutation({
  args: { email: v.string() },
  returns: v.union(v.id("waitlist"), v.null()),
  handler: async (ctx, args) => {
    // Check if email already exists
    const existing = await ctx.db
      .query("waitlist")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (existing) {
      return null;
    }

    return await ctx.db.insert("waitlist", {
      email: args.email,
    });
  },
});

export const waitlistTotal = query({
  args: {},
  returns: v.number(),
  handler: async (ctx) => {
    const entries = await ctx.db.query("waitlist").collect();
    return entries.length;
  },
});
