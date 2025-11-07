import { updateSongSchema } from '../../application/schemas/update-song.schema';

export const validateUpdateSong = async (payload: unknown) =>
  await updateSongSchema.parseAsync(payload);
