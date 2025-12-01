import { ServerRoute } from '@hapi/hapi';
import { PlaylistSongActivityHandler } from './playlist-song-activity.handler';

export class PlaylistSongActivityRoute {
  private collaborationHandler: PlaylistSongActivityHandler;

  constructor(collaborationHandler: PlaylistSongActivityHandler) {
    this.collaborationHandler = collaborationHandler;
  }

  public routes(): ServerRoute[] {
    return [
      {
        method: 'GET',
        path: '/playlists/{id}/activities',
        handler: this.collaborationHandler.getAllPlaylistSongActivityByPlaylistId,
        options: {
          auth: 'auth_jwt',
        },
      },
    ];
  }
}
