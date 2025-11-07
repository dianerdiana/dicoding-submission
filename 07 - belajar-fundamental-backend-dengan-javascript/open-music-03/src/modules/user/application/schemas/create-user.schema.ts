import z from 'zod';

export const createUserSchema = z.object({
  username: z.string(),
  password: z.string(),
  fullname: z.string(),
});
