import { Plugin } from '@hapi/hapi';
import { PlaylistSongRoute } from '../interface/http/playlist-song.route';
import { PlaylistSongHandler } from '../interface/http/playlist-song.handler';
import { PlaylistSongRepository } from './playlist-song.repository';
import { AddSongToPlaylistUseCase } from '../application/use-case/add-song-to-playlist.use-case';
import { GetPlaylistSongsUseCase } from '../application/use-case/get-playlist-songs.use-case';
import { DeleteSongFromPlaylistUseCase } from '../application/use-case/delete-song-from-playlist.use-case';

export const playlistSongPlugin: Plugin<undefined> = {
  name: 'playlistSongs',
  version: '1.0.0',
  register: async (server) => {
    const playlistSongRepository = new PlaylistSongRepository();
    const addSongToPlaylistUseCase = new AddSongToPlaylistUseCase(playlistSongRepository);
    const getPlaylistSongsUseCase = new GetPlaylistSongsUseCase(playlistSongRepository);
    const deleteSongFromPlaylistUseCase = new DeleteSongFromPlaylistUseCase(playlistSongRepository);
    const playlistSongHandler = new PlaylistSongHandler(
      addSongToPlaylistUseCase,
      getPlaylistSongsUseCase,
      deleteSongFromPlaylistUseCase,
    );

    server.route(new PlaylistSongRoute(playlistSongHandler).routes());
  },
};
