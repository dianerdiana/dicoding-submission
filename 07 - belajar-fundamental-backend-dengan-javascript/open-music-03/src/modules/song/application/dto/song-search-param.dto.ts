import z from 'zod';
import { songSearchParamSchema } from '../schemas/song-search-param.schema';

export type SongSearchParam = z.infer<typeof songSearchParamSchema>;
