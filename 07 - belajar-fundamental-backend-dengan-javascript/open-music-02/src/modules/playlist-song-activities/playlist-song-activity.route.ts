import { ServerRoute } from '@hapi/hapi';
import { PlaylistSongActivityHandler } from './playlist-song-activity.handler';

export class PlaylistSongActivityRoute {
  private playlistHandler: PlaylistSongActivityHandler;

  constructor(playlistHandler: PlaylistSongActivityHandler) {
    this.playlistHandler = playlistHandler;
  }

  public routes(): ServerRoute[] {
    return [
      {
        method: 'GET',
        path: '/playlists/{id}/activites',
        handler: this.playlistHandler.getAllActivitesByPlaylistId,
        options: {
          auth: 'auth_jwt',
        },
      },
    ];
  }
}
