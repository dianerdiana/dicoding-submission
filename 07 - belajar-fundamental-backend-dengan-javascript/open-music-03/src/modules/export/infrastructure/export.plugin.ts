import { Plugin } from '@hapi/hapi';
import { ExportRoute } from '../interface/http/export.route';
import { ExportHandler } from '../interface/http/export.handler';
import { ExportPlaylistSongsUseCase } from '../application/use-case/export-playlist-song.use-case';
import { PlaylistSongExportProducer } from '../../../app/producers/playlist-song/playlist-song-export.producer';

export const exportPlugin: Plugin<undefined> = {
  name: 'exports',
  version: '1.0.0',
  register: async (server) => {
    const playlistSongExportProducer = new PlaylistSongExportProducer();
    const exportPlaylistSongsUseCase = new ExportPlaylistSongsUseCase(playlistSongExportProducer);
    const exportHandler = new ExportHandler(exportPlaylistSongsUseCase);

    server.route(new ExportRoute(exportHandler).routes());
  },
};
