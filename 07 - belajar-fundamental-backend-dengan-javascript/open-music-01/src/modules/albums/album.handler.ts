import { AlbumService } from './album.service';

export class AlbumHandler {
  private albumService: AlbumService;

  constructor(albumService: AlbumService) {
    this.albumService = albumService;
  }
}
