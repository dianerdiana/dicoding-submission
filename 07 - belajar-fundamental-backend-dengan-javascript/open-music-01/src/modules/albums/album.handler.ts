import { ResponseObject } from '@hapi/hapi';
import { AlbumService } from './album.service';
import { HapiHandler } from '../../types/hapi';
import { successResponse } from '../../utils/response';
import { albumIdParamSchema, createAlbumSchema, updateAlbumSchema } from './album.schema';
import { NotFoundError } from '../../common/AppError';

const validateUUID = (id: string | undefined) => {
  const validation = albumIdParamSchema.safeParse(id);

  if (validation.error) {
    throw new NotFoundError(validation.error.issues[0].message);
  }
};

export class AlbumHandler {
  private albumService: AlbumService;

  constructor(albumService: AlbumService) {
    this.albumService = albumService;
  }

  createAlbum: HapiHandler = async (req, res): Promise<ResponseObject> => {
    const payload = await createAlbumSchema.parseAsync(req.payload);
    const albumId = await this.albumService.createAlbum(payload);

    return successResponse({ res, data: { albumId }, code: 201 });
  };

  getAlbumById: HapiHandler = async (req, res): Promise<ResponseObject> => {
    const { id } = req.params;
    validateUUID(id);

    const album = await this.albumService.getAlbumById(id);

    return successResponse({ res, data: { album }, code: 200 });
  };

  updateAlbum: HapiHandler = async (req, res): Promise<ResponseObject> => {
    const { id } = req.params;
    validateUUID(id);

    const payload = await updateAlbumSchema.parseAsync(req.payload);
    const updatedAlbum = await this.albumService.updateAlbum(id, payload);

    return successResponse({
      res,
      message: 'Successfuly updated albums',
      data: { album: updatedAlbum },
      code: 200,
    });
  };

  deleteAlbum: HapiHandler = async (req, res): Promise<ResponseObject> => {
    const { id } = req.params;
    validateUUID(id);

    await this.albumService.deleteAlbum(id);

    return successResponse({
      res,
      message: 'Successfuly deleted albums',
      data: { album: {} },
      code: 200,
    });
  };
}
