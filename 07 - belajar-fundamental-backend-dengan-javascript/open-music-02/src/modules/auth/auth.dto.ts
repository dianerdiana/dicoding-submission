import z from 'zod';
import { createAuthSchema, loginSchema } from './auth.schema';

export type CreateAuthDto = z.infer<typeof createAuthSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
export type TokenDto = {
  userId: string;
  username: string;
};
