import { ServerRoute } from '@hapi/hapi';
import { ExportHandler } from './export.handler';

export class ExportRoute {
  private exportHandler: ExportHandler;

  constructor(exportHandler: ExportHandler) {
    this.exportHandler = exportHandler;
  }

  public routes(): ServerRoute[] {
    return [
      {
        method: 'POST',
        path: '/export/playlists/{playlistId}',
        handler: this.exportHandler.exportPlaylistSongs,
        options: {
          auth: 'auth_jwt',
        },
      },
    ];
  }
}
