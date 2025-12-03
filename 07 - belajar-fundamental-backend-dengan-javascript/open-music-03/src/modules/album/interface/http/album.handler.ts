import { CreateAlbumUseCase } from '../../application/use-case/create-album.use-case';
import { GetAlbumByIdUseCase } from '../../application/use-case/get-album-by-id.use-case';
import { UpdateAlbumUseCase } from '../../application/use-case/update-album.use-case';
import { DeleteAlbumUseCase } from '../../application/use-case/delete-album.use-case';
import { HapiHandler } from '../../../../shared/types/hapi-handler.type';
import { validateCreateAlbum } from '../validators/create-album.validator';
import { validateUpdateAlbum } from '../validators/update-album.validator';
import { ApiResponse } from '../../../../shared/utils/api-response';
import { validateUploadAlbumCover } from '../validators/upload-album-cover.validator';
import { UploadAlbumCoverUseCase } from '../../application/use-case/upload-album-cover.use-case';

export class AlbumHandler {
  constructor(
    private readonly createAlbumUseCase: CreateAlbumUseCase,
    private readonly getAlbumByIdUseCase: GetAlbumByIdUseCase,
    private readonly updateAlbumUseCase: UpdateAlbumUseCase,
    private readonly deleteAlbumUseCase: DeleteAlbumUseCase,
    private readonly uploadAlbumCoverUseCase: UploadAlbumCoverUseCase,
  ) {}

  createAlbum: HapiHandler = async (req) => {
    const payload = await validateCreateAlbum(req.payload);
    const albumId = await this.createAlbumUseCase.execute(payload);

    return ApiResponse.created({ data: { albumId }, message: 'Successfuly created album' });
  };

  getAlbumById: HapiHandler = async (req) => {
    const album = await this.getAlbumByIdUseCase.execute(req.params.id);

    return ApiResponse.success({ data: { album } });
  };

  updateAlbum: HapiHandler = async (req) => {
    const payload = await validateUpdateAlbum(req.payload);
    const album = await this.updateAlbumUseCase.execute(req.params.id, payload);

    return ApiResponse.updated({ message: 'Successfuly updated album', data: { album } });
  };

  deleteAlbum: HapiHandler = async (req) => {
    await this.deleteAlbumUseCase.execute(req.params.id);

    return ApiResponse.deleted({ message: 'Successfuly deleted album' });
  };

  uploadAlbumCover: HapiHandler = async (req) => {
    const payload = await validateUploadAlbumCover(req.payload);

    const response = await this.uploadAlbumCoverUseCase.execute(payload, req.params.id);

    return ApiResponse.created({ data: response, message: 'success' });
  };
}
