import { Album } from './album.entity';

export class AlbumRepository {
  private albums: Album[] = [];

  async create(album: Album): Promise<void> {
    this.albums.push(album);
  }

  async findById(id: string): Promise<Album | null> {
    return this.albums.find((b) => b.id === id) ?? null;
  }

  async update(album: Album): Promise<void> {
    const index = this.albums.findIndex((b) => b.id === album.id);
    if (index !== -1) this.albums[index] = album;
  }

  async delete(id: string): Promise<void> {
    this.albums = this.albums.filter((b) => b.id !== id);
  }
}
