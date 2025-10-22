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
    const existing = await this.albumRepository.findById(id);
    if (!existing) throw new NotFoundError(`Album with id ${id} not found`);

    return existing;
  }

  async updateAlbum(id: string, payload: UpdateAlbumPayload) {
    const existing = await this.albumRepository.findById(id);
    if (!existing) throw new NotFoundError(`Album with id ${id} not found`);

    const album = new Album(existing);
    album.update(payload);

    const updatedAlbum = await this.albumRepository.update(album);
    return updatedAlbum;
  }

  async deleteAlbum(id: string) {
    const existing = await this.albumRepository.findById(id);
    if (!existing) throw new NotFoundError(`Album with id ${id} not found`);

    await this.albumRepository.delete(id);

    return true;
  }
}
