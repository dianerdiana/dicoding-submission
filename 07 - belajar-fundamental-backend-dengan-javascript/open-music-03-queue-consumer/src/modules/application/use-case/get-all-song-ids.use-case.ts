import { PlaylistSongRepository } from '@modules/infrastructure/repositories/playlist-song.repository.js';

export class GetAllSongIdsUseCase {
  constructor(private readonly playlistSongRepository: PlaylistSongRepository) {}

  async execute(playlistId: string) {
    const playlistSongs = await this.playlistSongRepository.findAllByPlaylistId(playlistId);
    const songIds = playlistSongs.map(playlistSong => playlistSong.getSongId());

    return songIds;
  }
}
