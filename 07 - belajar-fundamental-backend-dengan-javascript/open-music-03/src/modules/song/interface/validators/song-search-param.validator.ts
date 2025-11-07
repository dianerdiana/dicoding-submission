import { songSearchParamSchema } from '../../application/schemas/song-search-param.schema';

export const validateSongSearchParam = async (payload: unknown) =>
  await songSearchParamSchema.parseAsync(payload);
