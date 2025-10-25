import { AlbumService } from './album.service';
import { HapiHandler } from '../../types/hapi';
import { createAlbumSchema, updateAlbumSchema } from './album.schema';
import { validateUUID } from '../../utils/validateUUID';
export class AlbumHandler {
  private albumService: AlbumService;

  constructor(albumService: AlbumService) {
    this.albumService = albumService;
  }

  createAlbum: HapiHandler = async (req) => {
    const payload = await createAlbumSchema.parseAsync(req.payload);
    const response = await this.albumService.createAlbum(payload);

    return response;
  };

  getAlbumById: HapiHandler = async (req) => {
    const { id } = req.params;
    validateUUID(id);

    const response = await this.albumService.getAlbumById(id);

    return response;
  };

  updateAlbum: HapiHandler = async (req) => {
    const { id } = req.params;
    validateUUID(id);

    const payload = await updateAlbumSchema.parseAsync(req.payload);
    const response = await this.albumService.updateAlbum(id, payload);

    return response;
  };

  deleteAlbum: HapiHandler = async (req) => {
    const { id } = req.params;
    validateUUID(id);

    const response = await this.albumService.deleteAlbum(id);

    return response;
  };
}
