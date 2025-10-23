import { NotFoundError } from '../common/AppError';
import z from 'zod';

export const validateUUID = (id: string | undefined) => {
  const validation = z.uuid().safeParse(id);

  if (validation.error) {
    throw new NotFoundError(validation.error.issues[0].message);
  }
};
