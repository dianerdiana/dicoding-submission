import { SongRepository } from '../../infrastructure/song.repository';

export class GetAllSongsUseCase {
  constructor(private readonly songRepository: SongRepository) {}

  async execute() {
    const songs = await this.songRepository.findAll();

    return songs.map((song) => ({
      id: song.getId().toString(),
      title: song.getTitle(),
      performer: song.getPerformer(),
    }));
  }
}
