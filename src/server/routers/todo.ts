import { z } from "zod";
import { procedure, router } from "../trpc";

export const todoRouter = router({
  createTodo: procedure
    .input(
      z.object({
        text: z.string().min(3).max(25),
        description: z.string().nullable(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const data = await ctx.prisma.todo.create({
        data: {
          text: input.text,
          description: input.description,
        },
      });
      return data;
    }),

  getAllTodos: procedure.query(async ({ ctx }) => {
    const data = await ctx.prisma.todo.findMany();
    return data;
  }),

  getSingleTodo: procedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.prisma.todo.findUnique({
        where: {
          id: input.id,
        },
      });
      return data;
    }),

  updateTodo: procedure
    .input(
      z.object({
        id: z.number(),
        text: z.string().min(3).max(25),
        description: z.string().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.prisma.todo.update({
        where: {
          id: input.id,
        },
        data: {
          text: input.text,
          description: input.description,
        },
      });
      return data;
    }),
  deleteTodo: procedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.prisma.todo.delete({
        where: {
          id: input.id,
        },
      });
      return data;
    }),
  toggle: procedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const existingTodo = await ctx.prisma.todo.findUnique({
        where: {
          id: input.id,
        },
      });
      const toggledTodo = await ctx.prisma.todo.update({
        where: {
          id: input.id,
        },
        data: {
          completed: !existingTodo?.completed,
        },
      });
      return toggledTodo;
    }),
});
