import z from 'zod';
import * as Hapi from '@hapi/hapi';
import { Stream } from 'stream';
import { ACCEPTED_IMAGE_TYPES } from '../../../../shared/constants/accepted-image-types.constant';

const hapiFileSchema = z
  .custom<Stream & { hapi: { filename: string; headers: Hapi.Utils.Dictionary<string> } }>()
  .refine((file) => file && typeof file === 'object' && 'hapi' in file, {
    error: 'Structure file is not valid',
  })
  .refine(
    (file) => {
      const contentType = file.hapi.headers['content-type'];
      return ACCEPTED_IMAGE_TYPES.includes(contentType);
    },
    {
      error: 'File type is not allowed',
    },
  );

export const uploadAlbumCoverSchema = z.object({
  cover: hapiFileSchema,
});
