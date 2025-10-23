import { NotFoundError, ValidationError } from '../../common/AppError';
import { Song } from './song.entity';
import { SongRepository } from './song.repository';
import { CreateSongPayload, UpdateSongPayload } from './song.schema';

export class SongService {
  private songRepository: SongRepository;

  constructor(songRepository: SongRepository) {
    this.songRepository = songRepository;
  }

  async createSong(payload: CreateSongPayload) {
    const song = new Song(payload);
    const newSong = await this.songRepository.create(song);

    if (!newSong) {
      throw new ValidationError('Input is not valid');
    }

    return newSong.id;
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
    return songs.map((song) => ({
      id: song.id,
      title: song.title,
      performer: song.performer,
    }));
  }

  async getSongById(id: string) {
    const song = await this.songRepository.findById(id);
    if (!song) throw new NotFoundError(`Song with id ${id} is not found`);

    return song;
  }

  async updateSong(id: string, payload: UpdateSongPayload) {
    const existing = await this.songRepository.findById(id);
    if (!existing) throw new NotFoundError(`Song with id ${id} is not found`);

    const song = new Song(existing);
    song.update(payload);

    const updatedSong = await this.songRepository.update(id, song);
    return updatedSong;
  }

  async deleteSong(id: string) {
    const song = await this.songRepository.findById(id);
    if (!song) throw new NotFoundError(`Song with id ${id} is not found`);

    await this.songRepository.delete(id);

    return true;
  }
}
