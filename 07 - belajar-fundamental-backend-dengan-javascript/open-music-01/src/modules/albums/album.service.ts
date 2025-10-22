import { AlbumRepository } from './album.repository';

export class AlbumService {
  private albumRepository: AlbumRepository;

  constructor(albumRepository: AlbumRepository) {
    this.albumRepository = albumRepository;
  }
}
