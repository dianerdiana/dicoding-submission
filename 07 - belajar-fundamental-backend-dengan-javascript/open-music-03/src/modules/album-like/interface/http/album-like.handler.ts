import { STATUS_RESPONSE } from '../../../../shared/constants/status-responses.constant';
import { AuthCredential } from '../../../../shared/types/auth-credential.type';
import { HapiHandler } from '../../../../shared/types/hapi-handler.type';
import { ApiResponse } from '../../../../shared/utils/api-response';
import { CreateAlbumLikeUseCase } from '../../application/use-case/create-album-like.use-case';
import { DeleteAlbumLikeUseCase } from '../../application/use-case/delete-album-like.use-case';
import { GetAlbumLikeUseCase } from '../../application/use-case/get-album-like.use-case';

export class AlbumLikeHandler {
  constructor(
    private readonly createAlbumLikeUseCase: CreateAlbumLikeUseCase,
    private readonly deleteAlbumLikeUseCase: DeleteAlbumLikeUseCase,
    private readonly getAlbumLikeUseCase: GetAlbumLikeUseCase,
  ) {}

  createAlbumLike: HapiHandler = async (req) => {
    const { userId } = req.auth.credentials as AuthCredential;
    const albumLikeId = await this.createAlbumLikeUseCase.execute({
      albumId: req.params.id,
      userId,
    });

    return ApiResponse.created({ data: { albumLikeId }, message: 'Successfully liked album' });
  };

  getCountAlbumLike: HapiHandler = async (req, h) => {
    const albumLike = await this.getAlbumLikeUseCase.execute(req.params.id);

    const response = h
      .response({
        data: {
          likes: albumLike.likes,
        },
        status: STATUS_RESPONSE.success,
      })
      .header('X-Data-Source', albumLike.source);

    return response;
  };

  deleteAlbumLike: HapiHandler = async (req) => {
    const { userId } = req.auth.credentials as AuthCredential;
    await this.deleteAlbumLikeUseCase.execute({
      albumId: req.params.id,
      userId,
    });

    return ApiResponse.deleted({ message: 'Succesfuly deleted like album' });
  };
}
