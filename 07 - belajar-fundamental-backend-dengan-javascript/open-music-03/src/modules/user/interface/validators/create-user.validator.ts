import { createUserSchema } from '../../application/schemas/create-user.schema';

export const validateCreateUser = async (payload: unknown) =>
  await createUserSchema.parseAsync(payload);
