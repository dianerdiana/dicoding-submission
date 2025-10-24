import z from 'zod';

export const createUserSchema = z.object({
  fullname: z.string(),
  username: z.string(),
  password: z.string(),
});

export type CreateUserPayload = z.infer<typeof createUserSchema>;
