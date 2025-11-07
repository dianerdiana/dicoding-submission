import { SongRepository } from '../../infrastructure/song.repository';
import { SongSearchParam } from '../dto/song-search-param.dto';

export class GetAllSongsUseCase {
  constructor(private readonly songRepository: SongRepository) {}

  async execute(payload: SongSearchParam) {
    const songs = await this.songRepository.findAll(payload);

    return songs.map((song) => ({
      id: song.getId().toString(),
      title: song.getTitle(),
      performer: song.getPerformer(),
    }));
  }
}
