import z from 'zod';
import { createAuthSchema, loginSchema } from './auth.schema';

// Payload
export type CreateAuthPayloadDto = z.infer<typeof createAuthSchema>;
export type LoginPayloadDto = z.infer<typeof loginSchema>;

// Response
export type LoginResponseDto = { accessToken: string; refreshToken: string };
export type UpdateAccessTokenResponseDto = { accessToken: string };
