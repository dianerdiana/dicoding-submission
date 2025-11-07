import { refreshTokenSchema } from '../../application/schemas/refresh-token.schema';

export const validateRefreshToken = async (payload: unknown) =>
  await refreshTokenSchema.parseAsync(payload);
