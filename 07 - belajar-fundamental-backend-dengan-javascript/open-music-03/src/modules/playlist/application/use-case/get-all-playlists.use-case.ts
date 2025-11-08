import { PlaylistRepository } from '../../infrastructure/playlist.repository';

export class GetAllPlaylistsUseCase {
  constructor(private readonly playlistRepository: PlaylistRepository) {}

  async execute(userId: string) {
    const playlists = await this.playlistRepository.findAll(userId);
    return playlists.map((p) => p.toPrimitives());
  }
}
