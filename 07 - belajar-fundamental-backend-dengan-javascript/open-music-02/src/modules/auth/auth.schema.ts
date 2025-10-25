import z from 'zod';

export const createAuthSchema = z.object({
  userId: z.string(),
  refreshToken: z.string(),
});

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string(),
});
