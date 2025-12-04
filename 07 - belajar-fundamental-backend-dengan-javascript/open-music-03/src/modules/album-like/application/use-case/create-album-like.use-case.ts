import { SERVICE_KEYS } from '../../../../shared/constants/service-keys.constant';
import { BadRequestError } from '../../../../shared/errors/app-error';
import { serviceContainer } from '../../../../shared/utils/service-container';
import { GetAlbumByIdUseCase } from '../../../album/application/use-case/get-album-by-id.use-case';
import { GetUserByIdUseCase } from '../../../user/application/use-case/get-user-by-id.use-case';
import { AlbumLike } from '../../domain/entities/album-like.entity';
import { AlbumLikeRepository } from '../../infrasctructure/album-like.repository';

export class CreateAlbumLikeUseCase {
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
    const albumLikeExisting = await this.albumLikeRepository.findByAlbumIdAndUserId({
      albumId: album.id,
      userId: user.id,
    });

    if (albumLikeExisting) {
      throw new BadRequestError('Bad Request');
    }

    const albumLike = AlbumLike.create({ albumId: album.id, userId: user.id });

    await this.albumLikeRepository.save(albumLike);
    return albumLike.toPrimitives().id;
  }
}
