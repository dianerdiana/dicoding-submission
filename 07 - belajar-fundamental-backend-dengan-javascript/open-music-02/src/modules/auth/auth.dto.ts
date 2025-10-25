import z from 'zod';
import { createAuthSchema, loginSchema } from './auth.schema';

export type CreateAuthDTO = z.infer<typeof createAuthSchema>;
export type LoginDTO = z.infer<typeof loginSchema>;
export type TokenDTO = {
  userId: string;
  username: string;
};
