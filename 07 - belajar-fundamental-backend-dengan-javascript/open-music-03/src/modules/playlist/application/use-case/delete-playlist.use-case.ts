import { NotFoundError, ForbiddenError } from '../../../../shared/errors/app-error';
import { PlaylistRepository } from '../../infrastructure/playlist.repository';

export class DeletePlaylistUseCase {
  constructor(private readonly playlistRepository: PlaylistRepository) {}

  async execute(userId: string, playlistId: string) {
    const playlist = await this.playlistRepository.findById(playlistId);

    if (!playlist) {
      throw new NotFoundError('Playlist is not found');
    }

    if (playlist && playlist.getOwner() !== userId) {
      throw new ForbiddenError('Forbidden request');
    }

    const deleted = await this.playlistRepository.delete(playlist);
    return deleted;
  }
}
