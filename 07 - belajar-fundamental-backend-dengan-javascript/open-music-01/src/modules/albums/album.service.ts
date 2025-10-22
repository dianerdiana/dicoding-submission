import { NotFoundError } from '../../common/AppError';
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
    const newAlbum = new Album(payload);
    this.albumRepository.create(newAlbum);

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
    const album = await this.albumRepository.findById(id);
    if (!album) throw new NotFoundError(`Album with id ${id} is not found`);

    album.update(payload);

    await this.albumRepository.update(album);
    return album;
  }

  async deleteAlbum(id: string) {
    const album = await this.albumRepository.findById(id);
    if (!album) throw new NotFoundError(`Album with id ${id} is not found`);

    await this.albumRepository.delete(id);

    return true;
  }
}
