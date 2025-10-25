import z from 'zod';
import { createUserSchema } from './user.schema';

export type CreateUserDTO = z.infer<typeof createUserSchema>;
