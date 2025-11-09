import { SongRepository } from '../../infrastructure/song.repository';

export class GetSongsByIdsUseCase {
  constructor(private readonly songRepository: SongRepository) {}

  async execute(payload: string[]) {
    const songs = await this.songRepository.findByIds(payload);

    return songs.map((song) => ({
      id: song.getId().toString(),
      title: song.getTitle(),
      performer: song.getPerformer(),
    }));
  }
}
