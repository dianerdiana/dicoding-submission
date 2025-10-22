import { Song } from './song.entity';

export class SongRepository {
  private songs: Song[] = [];

  async create(album: Song): Promise<void> {
    this.songs.push(album);
  }

  async findAllSongs({
    title,
    performer,
    albumId,
  }: {
    title?: string;
    performer?: string;
    albumId?: string;
  }): Promise<Song[]> {
    let songs = this.songs;

    if (title !== undefined) {
      songs = this.songs.filter((song) => song.title.toLowerCase().includes(title.toLowerCase()));
    }

    if (performer !== undefined) {
      songs = this.songs.filter((song) =>
        song.performer.toLowerCase().includes(performer.toLowerCase()),
      );
    }

    if (albumId !== undefined) {
      songs = this.songs.filter((song) => song.albumId === albumId);
    }

    return songs;
  }

  async findById(id: string): Promise<Song | null> {
    return this.songs.find((b) => b.id === id) ?? null;
  }

  async update(album: Song): Promise<void> {
    const index = this.songs.findIndex((b) => b.id === album.id);
    if (index !== -1) this.songs[index] = album;
  }

  async delete(id: string): Promise<void> {
    this.songs = this.songs.filter((b) => b.id !== id);
  }
}
