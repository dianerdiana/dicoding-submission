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

export type CreateAuthPayload = z.infer<typeof createAuthSchema>;
export type LoginPayload = z.infer<typeof loginSchema>;
export type TokenPayload = {
  userId: string;
  username: string;
};
