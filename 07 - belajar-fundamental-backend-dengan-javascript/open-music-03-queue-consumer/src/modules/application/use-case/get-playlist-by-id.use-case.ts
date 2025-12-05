import { PlaylistRepository } from '@modules/infrastructure/repositories/playlist.repository.js';

export class GetPlaylistByIdUseCase {
  constructor(private readonly playlistRepository: PlaylistRepository) {}

  async execute(playlistId: string) {
    const playlist = await this.playlistRepository.findById(playlistId);

    if (!playlist) {
      throw new Error('Playlist is not found');
    }

    const playlistPrimitive = playlist.toPrimitives();
    return {
      id: playlistPrimitive.id,
      name: playlistPrimitive.name,
    };
  }
}
