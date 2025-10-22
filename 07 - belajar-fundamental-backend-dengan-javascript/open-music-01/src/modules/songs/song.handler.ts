import { SongService } from './song.service';

export class SongHandler {
  private songService: SongService;

  constructor(songService: SongService) {
    this.songService = songService;
  }
}
