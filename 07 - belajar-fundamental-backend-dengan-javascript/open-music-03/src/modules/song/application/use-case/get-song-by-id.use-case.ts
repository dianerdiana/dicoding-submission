import { redisConfig } from '../../../../app/configs/redis.config';
import { CACHES } from '../../../../shared/constants/caches.constant';
import { DATA_SOURCES } from '../../../../shared/constants/data-sources.constant';
import { NotFoundError } from '../../../../shared/errors/app-error';
import { Song } from '../../domain/entities/song.entity';
import { SongId } from '../../domain/value-objects/song-id.vo';
import { SongRepository } from '../../infrastructure/song.repository';

export class GetSongByIdUseCase {
  constructor(private readonly songRepository: SongRepository) {}

  async execute(id: string) {
    const songId = new SongId(id);

    const cacheKey = CACHES.getSongById(songId.toString());
    const cacheValue = (await redisConfig.getCache(cacheKey)) as Song;

    const response = { song: {}, source: DATA_SOURCES.database };

    if (cacheValue) {
      response.song = cacheValue;
      response.source = DATA_SOURCES.cache;
    } else {
      const song = await this.songRepository.findById(songId);

      if (!song) {
        throw new NotFoundError('Song is not found');
      }

      response.song = song.toPrimitives();
      await redisConfig.setCache(cacheKey, song.toPrimitives());
    }

    console.log(response);
    return response;
  }
}
