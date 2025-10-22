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

  async getSongById(id: string) {
    const existing = await this.songRepository.findById(id);
    if (!existing) throw new NotFoundError(`Song with id ${id} not found`);

    return existing;
  }

  async updateSong(id: string, payload: UpdateSongPayload) {
    const existing = await this.songRepository.findById(id);
    if (!existing) throw new NotFoundError(`Song with id ${id} not found`);

    const song = new Song(existing);
    song.update(payload);

    const updatedSong = await this.songRepository.update(song);
    return updatedSong;
  }

  async deleteSong(id: string) {
    const existing = await this.songRepository.findById(id);
    if (!existing) throw new NotFoundError(`Song with id ${id} not found`);

    await this.songRepository.delete(id);

    return true;
  }
}
