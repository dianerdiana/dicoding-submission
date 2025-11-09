import { ServerRoute } from '@hapi/hapi';
import { PlaylistSongHandler } from './playlist-song.handler';

export class PlaylistSongRoute {
  private playlistSongHandler: PlaylistSongHandler;

  constructor(playlistSongHandler: PlaylistSongHandler) {
    this.playlistSongHandler = playlistSongHandler;
  }

  public routes(): ServerRoute[] {
    return [
      {
        method: 'POST',
        path: '/playlists/{id}/songs',
        handler: this.playlistSongHandler.addSongToPlaylist,
        options: {
          auth: 'auth_jwt',
        },
      },
      {
        method: 'GET',
        path: '/playlists/{id}/songs',
        handler: this.playlistSongHandler.getPlaylistSongs,
        options: {
          auth: 'auth_jwt',
        },
      },
    ];
  }
}
