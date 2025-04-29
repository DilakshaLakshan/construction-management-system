import { v } from "convex/values";
import { mutation} from "./_generated/server";

export const CreateUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userData=await ctx.db.query('users')
    .filter(q=>q.eq(q.field('email'),args.email))
    .collect()
    if(userData?.length==0){
        const data={
            email:args.email,
            name:args.name,
        }
        const userData=await ctx.db.insert('users',{

        })
    }
  }
});