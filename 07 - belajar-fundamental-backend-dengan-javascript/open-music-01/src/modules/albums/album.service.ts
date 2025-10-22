import { NotFoundError } from '../../common/AppError';
import { Album } from './album.entity';
import { AlbumRepository } from './album.repository';
import { CreateAlbumPayload, UpdateAlbumPayload } from './album.schema';

export class AlbumService {
  private albumRepository: AlbumRepository;

  constructor(albumRepository: AlbumRepository) {
    this.albumRepository = albumRepository;
  }

  async createAlbum(payload: CreateAlbumPayload) {
    const newAlbum = new Album(payload);
    this.albumRepository.create(newAlbum);

    return newAlbum.id;
  }

  async getAlbumById(id: string) {
    const album = await this.albumRepository.findById(id);
    if (!album) throw new NotFoundError(`Album with id ${id} not found`);

    return album;
  }

  async updateAlbum(id: string, payload: UpdateAlbumPayload) {
    const album = await this.albumRepository.findById(id);
    if (!album) throw new NotFoundError(`Album with id ${id} not found`);

    album.update(payload);

    await this.albumRepository.update(album);
    return album;
  }

  async deleteAlbum(id: string) {
    const album = await this.albumRepository.findById(id);
    if (!album) throw new NotFoundError(`Album with id ${id} not found`);

    await this.albumRepository.delete(id);

    return true;
  }
}
