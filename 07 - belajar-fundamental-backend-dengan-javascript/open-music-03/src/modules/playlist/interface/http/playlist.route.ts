import { ServerRoute } from '@hapi/hapi';
import { PlaylistHandler } from './playlist.handler';

export class PlaylistRoute {
  private albumHandler: PlaylistHandler;

  constructor(albumHandler: PlaylistHandler) {
    this.albumHandler = albumHandler;
  }

  public routes(): ServerRoute[] {
    return [
      {
        method: 'POST',
        path: '/playlists',
        handler: this.albumHandler.createPlaylist,
        options: {
          auth: 'auth_jwt',
        },
      },
      {
        method: 'GET',
        path: '/playlists',
        handler: this.albumHandler.getAllPlaylists,
        options: {
          auth: 'auth_jwt',
        },
      },
      {
        method: 'DELETE',
        path: '/playlists/{id}',
        handler: this.albumHandler.deletePlaylist,
        options: {
          auth: 'auth_jwt',
        },
      },
    ];
  }
}
