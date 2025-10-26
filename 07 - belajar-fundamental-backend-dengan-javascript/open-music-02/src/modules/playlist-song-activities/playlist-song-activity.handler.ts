import { AuthCredential } from '../../types/AuthCredential';
import { HapiHandler } from '../../types/hapi';
import { validateUUID } from '../../utils/validateUUID';
import { PlaylistSongActivityService } from './playlist-song-activity.service';

export class PlaylistSongActivityHandler {
  private playlistSongActivityService: PlaylistSongActivityService;
  constructor(playlistSongActivityService: PlaylistSongActivityService) {
    this.playlistSongActivityService = playlistSongActivityService;
  }

  getAllActivitesByPlaylistId: HapiHandler = async (req) => {
    const { id: playlistId } = req.params;
    const { authId } = req.auth.credentials as AuthCredential;
    validateUUID(playlistId);
    const response = await this.playlistSongActivityService.getAllActivityByPlaylistId(
      playlistId,
      authId,
    );

    return response;
  };
}
