import { ApiResponse } from '../../common/ApiResponse';
import { BadRequestError, NotFoundError, ValidationError } from '../../common/AppError';
import {
  CreateSongPayloadDto,
  CreateSongResponseDto,
  GetAllSongResponseDto,
  GetSongByIdsResponseDto,
  GetSongResponseDto,
  UpdateSongPayloadDto,
  UpdateSongResponseDto,
} from './song.dto';
import { Song } from './song.entity';
import { SongRepository } from './song.repository';

export class SongService {
  private songRepository: SongRepository;

  constructor(songRepository: SongRepository) {
    this.songRepository = songRepository;
  }

  async validateSongById(id: string) {
    const existingSong = await this.songRepository.findById(id);
    if (!existingSong) throw new NotFoundError(`Song with id ${id} is not found`);

    const songResponse: GetSongResponseDto = { song: existingSong };
    return new ApiResponse({ data: songResponse });
  }

  async createSong(payload: CreateSongPayloadDto) {
    const song = new Song(payload);
    const newSong = await this.songRepository.create(song);

    if (!newSong) {
      throw new ValidationError('Input is not valid');
    }

    const responseData: CreateSongResponseDto = { songId: newSong.id };
    return new ApiResponse({ data: responseData, code: 201 });
  }

  async getAllSongs({
    title,
    performer,
    albumId,
  }: {
    title?: string;
    performer?: string;
    albumId?: string;
  }) {
    const songs = await this.songRepository.findAllSongs({ title, performer, albumId });
    const responseData: GetAllSongResponseDto = {
      songs: songs.map((song) => ({
        id: song.id,
        title: song.title,
        performer: song.performer,
      })),
    };
    return new ApiResponse({ data: responseData });
  }

  async getSongById(id: string) {
    const validateResponse = await this.validateSongById(id);
    const responseData = validateResponse.data as GetSongResponseDto;

    return new ApiResponse({ data: responseData });
  }

  async getSongByIds(ids: string[]) {
    const existingSongs = await this.songRepository.findByIds(ids);
    const responseData: GetSongByIdsResponseDto = { songs: existingSongs };

    return new ApiResponse({ data: responseData });
  }

  async updateSong(id: string, payload: UpdateSongPayloadDto) {
    const validateResponse = await this.validateSongById(id);
    const { song: existingSong } = validateResponse.data as GetSongResponseDto;

    const song = new Song(existingSong);
    song.update(payload);

    const updatedSong = await this.songRepository.update(id, song);
    if (!updatedSong) throw new BadRequestError('Failed update song');

    const songResponse: UpdateSongResponseDto = { song: updatedSong };
    return new ApiResponse({ data: songResponse, message: 'Successfuly updated song' });
  }

  async deleteSong(id: string) {
    await this.validateSongById(id);
    await this.songRepository.delete(id);

    return new ApiResponse({ message: 'Successfuly deleted song' });
  }
}
