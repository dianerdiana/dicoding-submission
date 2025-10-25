import { ApiResponse } from '../../common/ApiResponse';
import { NotFoundError, ValidationError } from '../../common/AppError';
import { serviceContainer } from '../../common/ServiceContainer';
import { SongService } from '../songs/song.service';
import { CreateAlbumDTO, UpdateAlbumDTO } from './album.dto';
import { Album } from './album.entity';
import { AlbumRepository } from './album.repository';

export class AlbumService {
  private albumRepository: AlbumRepository;
  private songService: SongService;

  constructor(albumRepository: AlbumRepository) {
    this.albumRepository = albumRepository;
    this.songService = serviceContainer.get<SongService>('SongService');
  }

  async createAlbum(payload: CreateAlbumDTO) {
    const album = new Album({ id: '', ...payload });
    const newAlbum = await this.albumRepository.create(album);

    if (!newAlbum) {
      throw new ValidationError(`Album data is invalid`);
    }

    return new ApiResponse({
      message: 'Successfuly created album',
      data: {
        albumId: newAlbum.id,
      },
      code: 201,
    });
  }

  async getAlbumById(id: string) {
    const album = await this.albumRepository.findById(id);
    if (!album) throw new NotFoundError(`Album with id ${id} is not found`);

    const response = await this.songService.getAllSongs({ albumId: album.id });

    return new ApiResponse({
      data: {
        album: {
          ...album,
          ...response.data,
        },
      },
    });
  }

  async updateAlbum(id: string, payload: UpdateAlbumDTO) {
    const existing = await this.albumRepository.findById(id);
    if (!existing) throw new NotFoundError(`Album with id ${id} is not found`);

    const album = new Album(existing);
    album.update(payload);

    const updatedAlbum = await this.albumRepository.update(id, album);

    return new ApiResponse({
      message: 'Successfuly updated album',
      data: {
        album: updatedAlbum,
      },
    });
  }

  async deleteAlbum(id: string) {
    const album = await this.albumRepository.findById(id);
    if (!album) throw new NotFoundError(`Album with id ${id} is not found`);

    await this.albumRepository.delete(id);

    return new ApiResponse({ message: 'Successfuly deleted album' });
  }
}
