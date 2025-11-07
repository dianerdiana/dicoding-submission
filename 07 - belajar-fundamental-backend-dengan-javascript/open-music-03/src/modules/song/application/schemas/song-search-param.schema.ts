import z from 'zod';

export const songSearchParamSchema = z.object({
  title: z.string().optional(),
  performer: z.string().optional(),
  filters: z
    .array(
      z.object({
        field: z.string(),
        value: z.string().or(z.number()),
      }),
    )
    .optional(),
});
