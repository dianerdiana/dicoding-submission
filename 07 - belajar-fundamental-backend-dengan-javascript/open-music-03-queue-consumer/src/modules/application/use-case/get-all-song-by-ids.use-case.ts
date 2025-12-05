import { SongRepository } from '@modules/infrastructure/repositories/song.repository.js';

export class GetAllSongByIdsUseCase {
  constructor(private readonly songRepository: SongRepository) {}

  async execute(payload: string[]) {
    const songs = await this.songRepository.findAllByIds(payload);

    return songs.map(song => ({
      id: song.getId().toString(),
      title: song.getTitle(),
      performer: song.getPerformer(),
    }));
  }
}
