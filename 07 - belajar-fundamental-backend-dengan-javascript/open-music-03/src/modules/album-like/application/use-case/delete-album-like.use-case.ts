import { SERVICE_KEYS } from '../../../../shared/constants/service-keys.constant';
import { NotFoundError } from '../../../../shared/errors/app-error';
import { serviceContainer } from '../../../../shared/utils/service-container';
import { GetAlbumByIdUseCase } from '../../../album/application/use-case/get-album-by-id.use-case';
import { GetUserByIdUseCase } from '../../../user/application/use-case/get-user-by-id.use-case';
import { AlbumLikeRepository } from '../../infrasctructure/album-like.repository';

export class DeleteAlbumLikeUseCase {
  constructor(private readonly albumLikeRepository: AlbumLikeRepository) {}

  async execute(payload: { albumId: string; userId: string }) {
    const { userId, albumId } = payload;

    const getUserByIdUseCase = serviceContainer.get<GetUserByIdUseCase>(
      SERVICE_KEYS.GET_USER_BY_ID_USE_CASE,
    );
    const getAlbumByIdUseCase = serviceContainer.get<GetAlbumByIdUseCase>(
      SERVICE_KEYS.GET_ALBUM_BY_ID_USE_CASE,
    );

    const user = await getUserByIdUseCase.execute(userId);
    const album = await getAlbumByIdUseCase.execute(albumId);

    const albumLike = await this.albumLikeRepository.findByAlbumIdAndUserId({
      albumId: album.id,
      userId: user.id,
    });

    if (!albumLike) {
      throw new NotFoundError('Not found');
    }

    const deleted = await this.albumLikeRepository.delete(albumLike);
    return deleted;
  }
}
