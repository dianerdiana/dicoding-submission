import { ResponseObject } from '@hapi/hapi';
import { AlbumService } from './album.service';
import { HapiHandler } from '../../types/hapi';
import { successResponse } from '../../utils/response';
import { albumIdParamSchema, createAlbumSchema } from './album.schema';

export class AlbumHandler {
  private albumService: AlbumService;

  constructor(albumService: AlbumService) {
    this.albumService = albumService;
  }

  postAlbums: HapiHandler = async (req, res): Promise<ResponseObject> => {
    const payload = await createAlbumSchema.parseAsync(req.payload);
    const newAlbum = await this.albumService.createAlbum(payload);

    return successResponse({ res, data: { albums: newAlbum }, code: 201 });
  };

  getAlbums: HapiHandler = async (req, res): Promise<ResponseObject> => {
    const { id } = await albumIdParamSchema.parseAsync(req.params);
    const album = await this.albumService.getAlbumById(id);

    return successResponse({ res, data: { album }, code: 200 });
  };

  putAlbums: HapiHandler = async (req, res): Promise<ResponseObject> => {
    const { id } = await albumIdParamSchema.parseAsync(req.params);
    const payload = await createAlbumSchema.parseAsync(req.payload);
    const updatedAlbum = await this.albumService.updateAlbum(id, payload);

    return successResponse({
      res,
      message: 'Successfuly updated albums',
      data: { album: updatedAlbum },
      code: 200,
    });
  };

  deleteAlbums: HapiHandler = async (req, res): Promise<ResponseObject> => {
    const { id } = await albumIdParamSchema.parseAsync(req.params);
    await this.albumService.deleteAlbum(id);

    return successResponse({
      res,
      message: 'Successfuly deleted albums',
      data: { album: {} },
      code: 200,
    });
  };
}
