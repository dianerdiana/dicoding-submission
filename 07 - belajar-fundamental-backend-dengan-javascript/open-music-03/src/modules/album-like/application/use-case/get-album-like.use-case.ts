import { redisConfig } from '../../../../app/configs/redis.config';
import { CACHES } from '../../../../shared/constants/caches.constant';
import { DATA_SOURCES } from '../../../../shared/constants/data-sourceS.constant';
import { SERVICE_KEYS } from '../../../../shared/constants/service-keys.constant';
import { serviceContainer } from '../../../../shared/utils/service-container';
import { GetAlbumByIdUseCase } from '../../../album/application/use-case/get-album-by-id.use-case';
import { AlbumLikeRepository } from '../../infrasctructure/album-like.repository';

export class GetAlbumLikeUseCase {
  constructor(private readonly albumLikeRepository: AlbumLikeRepository) {}

  async execute(albumId: string) {
    const getAlbumByIdUseCase = serviceContainer.get<GetAlbumByIdUseCase>(
      SERVICE_KEYS.GET_ALBUM_BY_ID_USE_CASE,
    );

    const album = await getAlbumByIdUseCase.execute(albumId);

    const response = { likes: 0, source: DATA_SOURCES.database };
    const cacheKey = CACHES.albumLike(album.id);
    const cacheValue = await redisConfig.getCache(cacheKey);

    if (cacheValue) {
      response.likes = Number(cacheValue);
      response.source = DATA_SOURCES.cache;
    } else {
      const cacheEx = 30 * 60;
      const count = await this.albumLikeRepository.countAllByAlbumId(album.id);
      await redisConfig.setCache(cacheKey, count, cacheEx);
      response.likes = count;
    }

    return response;
  }
}
