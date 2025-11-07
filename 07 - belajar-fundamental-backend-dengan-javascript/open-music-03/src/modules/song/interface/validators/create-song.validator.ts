import { createSongSchema } from '../../application/schemas/create-song.schema';

export const validateCreateSong = async (payload: unknown) =>
  await createSongSchema.parseAsync(payload);
