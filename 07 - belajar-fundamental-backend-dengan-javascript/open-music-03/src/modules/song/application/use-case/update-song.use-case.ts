import { NotFoundError } from '../../../../shared/errors/app-error';
import { SongId } from '../../domain/value-objects/song-id.vo';
import { SongRepository } from '../../infrastructure/song.repository';
import { UpdateSongDto } from '../dto/update-song.dto';

export class UpdateSongUseCase {
  constructor(private readonly songRepository: SongRepository) {}

  async execute(id: string, payload: UpdateSongDto) {
    const { title, genre, performer, year, duration } = payload;

    const songId = new SongId(id);
    const song = await this.songRepository.findById(songId);

    if (!song) {
      throw new NotFoundError('Song is not found');
    }

    song.updateTitle(title);
    song.updateYear(year);
    song.updateGenre(genre);
    song.updatePerformer(performer);
    song.updateDuration(duration);

    await this.songRepository.save(song);
    return song.toPrimitives();
  }
}
