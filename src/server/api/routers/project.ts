import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        githubUrl: z.string(),
        githubToken: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
          await ctx.db.user.upsert({
        where: { id: ctx.user.userId! },
        create: { id: ctx.user.userId! },
        update: {}, // nothing to update
      });
      const project = await ctx.db.project.create({
        data: {
          githuburl: input.githubUrl,
          name: input.name,
          userToProjects: {
            create: { userId: ctx.user.userId! },
          },
        },
      });
      return project;
    }),
});
