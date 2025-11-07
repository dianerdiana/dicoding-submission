import z from 'zod';
import { signInSchema } from '../schemas/signin.schema';

export type SignInDto = z.infer<typeof signInSchema>;
