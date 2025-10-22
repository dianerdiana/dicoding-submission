import { Song } from './song.entity';

export class SongRepository {
  private albums: Song[] = [];

  async create(album: Song): Promise<void> {
    this.albums.push(album);
  }

  async findAllSongs(): Promise<Song[] | []> {
    return this.albums;
  }

  async findById(id: string): Promise<Song | null> {
    return this.albums.find((b) => b.id === id) ?? null;
  }

  async update(album: Song): Promise<void> {
    const index = this.albums.findIndex((b) => b.id === album.id);
    if (index !== -1) this.albums[index] = album;
  }

  async delete(id: string): Promise<void> {
    this.albums = this.albums.filter((b) => b.id !== id);
  }
}
