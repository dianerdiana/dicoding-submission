import { ServerRoute } from '@hapi/hapi';
import { PlaylistSongHandler } from './playlist-song.handler';

export class PlaylistSongRoute {
  private playlistHandler: PlaylistSongHandler;

  constructor(playlistHandler: PlaylistSongHandler) {
    this.playlistHandler = playlistHandler;
  }

  public routes(): ServerRoute[] {
    return [
      {
        method: 'POST',
        path: '/playlists/{id}/songs',
        handler: this.playlistHandler.addSongToPlaylistSong,
        options: {
          auth: 'auth_jwt',
        },
      },
      {
        method: 'GET',
        path: '/playlists/{id}/songs',
        handler: this.playlistHandler.getPlaylistWithAllSongs,
        options: {
          auth: 'auth_jwt',
        },
      },
      {
        method: 'DELETE',
        path: '/playlists/{id}/songs',
        handler: this.playlistHandler.deleteSongFromPlaylistByPlaylistId,
        options: {
          auth: 'auth_jwt',
        },
      },
    ];
  }
}
