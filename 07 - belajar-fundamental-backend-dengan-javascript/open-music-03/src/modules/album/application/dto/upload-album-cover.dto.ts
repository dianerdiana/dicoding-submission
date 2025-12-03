import z from 'zod';
import { uploadAlbumCoverSchema } from '../schemas/upload-album-cover.schema';

export type UploadAlbumCoverDto = z.infer<typeof uploadAlbumCoverSchema>;
