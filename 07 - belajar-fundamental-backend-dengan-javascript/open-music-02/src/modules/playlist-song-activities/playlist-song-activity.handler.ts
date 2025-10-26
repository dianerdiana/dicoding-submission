import { HapiHandler } from '../../types/hapi';
import { PlaylistSongActivityService } from './playlist-song-activity.service';

export class PlaylistSongActivityHandler {
  private playlistSongActivityService: PlaylistSongActivityService;
  constructor(playlistSongActivityService: PlaylistSongActivityService) {
    this.playlistSongActivityService = playlistSongActivityService;
  }

  getAllActivitesByPlaylistId: HapiHandler = async (req) => {
    const { id: playlistId } = req.params;
    const response = await this.playlistSongActivityService.getAllActivityByPlaylistId(playlistId);

    return response;
  };
}
