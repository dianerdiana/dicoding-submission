import { signInSchema } from '../../application/schemas/signin.schema';

export const validateSignIn = async (payload: unknown) => await signInSchema.parseAsync(payload);
