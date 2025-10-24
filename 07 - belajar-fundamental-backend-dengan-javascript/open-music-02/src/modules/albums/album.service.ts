import { NotFoundError, ValidationError } from '../../common/AppError';
import { serviceContainer } from '../../common/ServiceContainer';
import { SongService } from '../songs/song.service';
import { Album } from './album.entity';
import { AlbumRepository } from './album.repository';
import { CreateAlbumPayload, UpdateAlbumPayload } from './album.schema';

export class AlbumService {
  private albumRepository: AlbumRepository;
  private songService: SongService;

  constructor(albumRepository: AlbumRepository) {
    this.albumRepository = albumRepository;
    this.songService = serviceContainer.get<SongService>('SongService');
  }

  async createAlbum(payload: CreateAlbumPayload) {
    const album = new Album(payload);
    const newAlbum = await this.albumRepository.create(album);

    if (!newAlbum) {
      throw new ValidationError(`Album data is invalid`);
    }

    return newAlbum.id;
  }

  async getAlbumById(id: string) {
    const album = await this.albumRepository.findById(id);
    if (!album) throw new NotFoundError(`Album with id ${id} is not found`);

    const songs = await this.songService.getAllSongs({ albumId: album.id });

    return {
      ...album,
      songs,
    };
  }

  async updateAlbum(id: string, payload: UpdateAlbumPayload) {
    const existing = await this.albumRepository.findById(id);
    if (!existing) throw new NotFoundError(`Album with id ${id} is not found`);

    const album = new Album(existing);
    album.update(payload);

    const updatedAlbum = await this.albumRepository.update(id, album);
    return updatedAlbum;
  }

  async deleteAlbum(id: string) {
    const album = await this.albumRepository.findById(id);
    if (!album) throw new NotFoundError(`Album with id ${id} is not found`);

    await this.albumRepository.delete(id);

    return true;
  }
}
