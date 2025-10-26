import { ApiResponse } from '../../common/ApiResponse';
import { BadRequestError, NotFoundError, ValidationError } from '../../common/AppError';
import { serviceContainer } from '../../common/ServiceContainer';
import { AllSongsResponseDto } from '../songs/song.dto';
import { SongService } from '../songs/song.service';
import {
  CreateAlbumPayloadDto,
  CreateAlbumResponseDto,
  GetAlbumByIdResponseDto,
  UpdateAlbumPayloadDto,
  UpdateAlbumResponseDto,
} from './album.dto';
import { Album } from './album.entity';
import { AlbumRepository } from './album.repository';

export class AlbumService {
  private albumRepository: AlbumRepository;

  constructor(albumRepository: AlbumRepository) {
    this.albumRepository = albumRepository;
  }

  private getSongService(): SongService {
    return serviceContainer.get<SongService>('SongService');
  }

  async createAlbum(payload: CreateAlbumPayloadDto) {
    const album = new Album({ id: '', ...payload });
    const newAlbum = await this.albumRepository.create(album);

    if (!newAlbum) throw new ValidationError(`Album data is invalid`);

    const responseData: CreateAlbumResponseDto = {
      albumId: newAlbum.id,
    };

    return new ApiResponse({
      message: 'Successfuly created album',
      data: responseData,
      code: 201,
    });
  }

  async getAlbumById(id: string) {
    const songService = this.getSongService();
    const album = await this.albumRepository.findById(id);
    if (!album) throw new NotFoundError(`Album with id ${id} is not found`);

    const response = await songService.getAllSongs({ albumId: album.id });
    const { songs } = response.data as AllSongsResponseDto;

    const responseData: GetAlbumByIdResponseDto = {
      album: {
        ...album,
        songs: songs,
      },
    };
    return new ApiResponse({ data: responseData });
  }

  async updateAlbum(id: string, payload: UpdateAlbumPayloadDto) {
    const existingAlbum = await this.albumRepository.findById(id);
    if (!existingAlbum) throw new NotFoundError(`Album with id ${id} is not found`);

    const album = new Album(existingAlbum);
    album.update(payload);

    const updatedAlbum = await this.albumRepository.update(id, album);
    if (!updatedAlbum) throw new BadRequestError('Failed update album');

    const responseData: UpdateAlbumResponseDto = {
      album: updatedAlbum,
    };

    return new ApiResponse({
      message: 'Successfuly updated album',
      data: responseData,
    });
  }

  async deleteAlbum(id: string) {
    const album = await this.albumRepository.findById(id);
    if (!album) throw new NotFoundError(`Album with id ${id} is not found`);

    await this.albumRepository.delete(id);
    return new ApiResponse({ message: 'Successfuly deleted album' });
  }
}
