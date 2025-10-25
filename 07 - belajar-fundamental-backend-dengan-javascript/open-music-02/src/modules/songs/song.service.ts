import { ApiResponse } from '../../common/ApiResponse';
import { BadRequestError, NotFoundError, ValidationError } from '../../common/AppError';
import { CreateSongDTO, SongResponseDTO, UpdateSongDTO } from './song.dto';
import { Song } from './song.entity';
import { SongRepository } from './song.repository';

export class SongService {
  private songRepository: SongRepository;

  constructor(songRepository: SongRepository) {
    this.songRepository = songRepository;
  }

  async createSong(payload: CreateSongDTO) {
    const song = new Song(payload);
    const newSong = await this.songRepository.create(song);

    if (!newSong) {
      throw new ValidationError('Input is not valid');
    }

    return new ApiResponse({ data: { songId: newSong.id }, code: 201 });
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
    const sanitizedSongs = songs.map((song) => ({
      id: song.id,
      title: song.title,
      performer: song.performer,
    }));

    return new ApiResponse({ data: { songs: sanitizedSongs } });
  }

  async getSongById(id: string) {
    const existingSong = await this.songRepository.findById(id);
    if (!existingSong) throw new NotFoundError(`Song with id ${id} is not found`);

    const songResponse: SongResponseDTO = { song: existingSong };
    return new ApiResponse({ data: songResponse });
  }

  async updateSong(id: string, payload: UpdateSongDTO) {
    const existingSong = await this.songRepository.findById(id);
    if (!existingSong) throw new NotFoundError(`Song with id ${id} is not found`);

    const song = new Song(existingSong);
    song.update(payload);

    const updatedSong = await this.songRepository.update(id, song);
    if (!updatedSong) throw new BadRequestError('Failed update song');

    const songResponse: SongResponseDTO = { song: updatedSong };
    return new ApiResponse({ data: songResponse, message: 'Successfuly updated song' });
  }

  async deleteSong(id: string) {
    const song = await this.songRepository.findById(id);
    if (!song) throw new NotFoundError(`Song with id ${id} is not found`);

    await this.songRepository.delete(id);

    return new ApiResponse({ message: 'Successfuly deleted song' });
  }
}
