import { CreateAlbumUseCase } from '../../application/use-case/create-album.use-case';
import { GetAlbumByIdUseCase } from '../../application/use-case/get-album-by-id.use-case';
import { UpdateAlbumUseCase } from '../../application/use-case/update-album.use-case';
import { DeleteAlbumUseCase } from '../../application/use-case/delete-album.use-case';
import { HapiHandler } from '../../../../shared/types/hapi-handler.type';
import { validateCreateAlbum } from '../validators/create-album.validator';
import { validateUpdateAlbum } from '../validators/update-album.validator';

export class AlbumHandler {
  constructor(
    private readonly createAlbumUseCase: CreateAlbumUseCase,
    private readonly getAlbumByIdUseCase: GetAlbumByIdUseCase,
    private readonly updateAlbumUseCase: UpdateAlbumUseCase,
    private readonly deleteAlbumUseCase: DeleteAlbumUseCase,
  ) {}

  createAlbum: HapiHandler = async (req, h) => {
    const payload = await validateCreateAlbum(req.payload);
    const albumId = await this.createAlbumUseCase.execute(payload);

    return h
      .response({
        status: 'success',
        message: 'Successfuly created album',
        data: { albumId },
      })
      .code(201);
  };

  getAlbumById: HapiHandler = async (req, h) => {
    const album = await this.getAlbumByIdUseCase.execute(req.params.id);

    return h.response({
      status: 'success',
      data: { album },
    });
  };

  updateAlbum: HapiHandler = async (req, h) => {
    const payload = await validateUpdateAlbum(req.payload);
    const album = await this.updateAlbumUseCase.execute(req.params.id, payload);

    return h.response({
      status: 'success',
      message: 'Successfuly updated album',
      data: { album },
    });
  };

  deleteAlbum: HapiHandler = async (req, h) => {
    await this.deleteAlbumUseCase.execute(req.params.id);

    return h.response({
      status: 'success',
      message: 'Successfuly deleted album',
    });
  };
}
