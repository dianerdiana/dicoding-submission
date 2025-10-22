import { NotFoundError } from '../../common/AppError';
import { Song } from './song.entity';
import { SongRepository } from './song.repository';
import { CreateSongPayload, UpdateSongPayload } from './song.schema';

export class SongService {
  private songRepository: SongRepository;

  constructor(songRepository: SongRepository) {
    this.songRepository = songRepository;
  }

  async createSong(payload: CreateSongPayload) {
    const newSong = new Song(payload);
    this.songRepository.create(newSong);

    return newSong.id;
  }

  async getAllSongs() {
    const songs = await this.songRepository.findAllSongs();
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
    const song = await this.songRepository.findById(id);
    if (!song) throw new NotFoundError(`Song with id ${id} is not found`);

    song.update(payload);

    const updatedSong = await this.songRepository.update(song);
    return updatedSong;
  }

  async deleteSong(id: string) {
    const song = await this.songRepository.findById(id);
    if (!song) throw new NotFoundError(`Song with id ${id} is not found`);

    await this.songRepository.delete(id);

    return true;
  }
}
