import { ServerRoute } from '@hapi/hapi';
import { PlaylistHandler } from './playlist.handler';

export class PlaylistRoute {
  private playlistHandler: PlaylistHandler;

  constructor(playlistHandler: PlaylistHandler) {
    this.playlistHandler = playlistHandler;
  }

  public routes(): ServerRoute[] {
    return [
      {
        method: 'POST',
        path: '/playlists',
        handler: this.playlistHandler.createPlaylist,
        options: {
          auth: 'auth_jwt',
        },
      },
      {
        method: 'GET',
        path: '/playlists',
        handler: this.playlistHandler.getAllPlaylists,
        options: {
          auth: 'auth_jwt',
        },
      },
      {
        method: 'GET',
        path: '/playlists/{id}',
        handler: this.playlistHandler.getPlaylistById,
        options: {
          auth: 'auth_jwt',
        },
      },
      {
        method: 'PUT',
        path: '/playlists/{id}',
        handler: this.playlistHandler.updatePlaylist,
        options: {
          auth: 'auth_jwt',
        },
      },
      {
        method: 'DELETE',
        path: '/playlists/{id}',
        handler: this.playlistHandler.deletePlaylist,
        options: {
          auth: 'auth_jwt',
        },
      },
    ];
  }
}
