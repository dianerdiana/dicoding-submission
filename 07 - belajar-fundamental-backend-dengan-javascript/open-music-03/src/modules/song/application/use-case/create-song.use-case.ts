import { Song } from '../../domain/entities/song.entity';
import { SongRepository } from '../../infrastructure/song.repository';
import { CreateSongDto } from '../dto/create-song.dto';

export class CreateSongUseCase {
  constructor(private readonly songRepository: SongRepository) {}

  async execute(payload: CreateSongDto) {
    const { title, genre, performer, year, duration } = payload;
    const song = Song.create({ title, genre, performer, year, duration });
    await this.songRepository.save(song);
    return song.getId().toString();
  }
}
