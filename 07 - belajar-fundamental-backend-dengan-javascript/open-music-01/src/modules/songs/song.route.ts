import { ServerRoute } from '@hapi/hapi';
import { SongHandler } from './song.handler';

export class SongRoute {
  private songHandler: SongHandler;

  constructor(songHandler: SongHandler) {
    this.songHandler = songHandler;
  }

  public routes(): ServerRoute[] {
    return [
      {
        method: 'GET',
        path: '/songs',
        handler: (req, res) => res.response({ message: 'Hi' }),
      },
    ];
  }
}
