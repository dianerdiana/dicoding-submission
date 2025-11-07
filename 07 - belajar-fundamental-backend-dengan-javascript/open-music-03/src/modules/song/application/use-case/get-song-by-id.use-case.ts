import { NotFoundError } from '../../../../shared/errors/app-error';
import { SongId } from '../../domain/value-objects/song-id.vo';
import { SongRepository } from '../../infrastructure/song.repository';

export class GetSongByIdUseCase {
  constructor(private readonly songRepository: SongRepository) {}

  async execute(id: string) {
    const songId = new SongId(id);
    const song = await this.songRepository.findById(songId);

    if (!song) {
      throw new NotFoundError('Song is not found');
    }

    return song.toPrimitives();
  }
}
