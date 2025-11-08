import { Playlist } from '../../domain/entities/playlist.entity';
import { PlaylistRepository } from '../../infrastructure/playlist.repository';
import { CreatePlaylistDto } from '../dto/create-playlist.dto';

export class CreatePlaylistUseCase {
  constructor(private readonly playlistRepository: PlaylistRepository) {}

  async execute(userId: string, payload: CreatePlaylistDto) {
    const { name } = payload;
    const playlist = Playlist.create({ name, owner: userId });

    await this.playlistRepository.save(playlist);
    return playlist.toPrimitives().id;
  }
}
