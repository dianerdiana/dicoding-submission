import { NotFoundError, ValidationError } from '../../common/AppError';
import { serviceContainer } from '../../common/ServiceContainer';
import { UserService } from '../users/user.service';
import { Playlist } from './playlist.entity';
import { PlaylistRepository } from './playlist.repository';
import {
  CreatePlaylistPayload,
  PlaylistSearchParamPayload,
  UpdatePlaylistPayload,
} from './playlist.schema';

export class PlaylistService {
  private playlistRepository: PlaylistRepository;
  private userService: UserService;

  constructor(playlistRepository: PlaylistRepository) {
    this.playlistRepository = playlistRepository;
    this.userService = serviceContainer.get<UserService>('UserService');
  }

  async createPlaylist(payload: CreatePlaylistPayload) {
    const playlist = new Playlist({ id: '', ...payload });
    const newPlaylist = await this.playlistRepository.create(playlist);

    if (!newPlaylist) {
      throw new ValidationError('Input is not valid');
    }

    return newPlaylist.id;
  }

  async getAllPlaylists({ name, owner }: PlaylistSearchParamPayload) {
    const playlists = await this.playlistRepository.findAllPlaylists({ name, owner });
    const user = await this.userService.getUserById(owner);

    return playlists.map((playlist) => ({
      id: playlist.id,
      name: playlist.name,
      username: user.username,
    }));
  }

  async getPlaylistById(id: string) {
    const playlist = await this.playlistRepository.findById(id);
    if (!playlist) throw new NotFoundError(`Playlist with id ${id} is not found`);

    return playlist;
  }

  async updatePlaylist(id: string, payload: UpdatePlaylistPayload) {
    const existing = await this.playlistRepository.findById(id);
    if (!existing) throw new NotFoundError(`Playlist with id ${id} is not found`);

    const playlist = new Playlist(existing);
    playlist.update(payload);

    const updatedPlaylist = await this.playlistRepository.update(id, playlist);
    return updatedPlaylist;
  }

  async deletePlaylist(id: string) {
    const playlist = await this.playlistRepository.findById(id);
    if (!playlist) throw new NotFoundError(`Playlist with id ${id} is not found`);

    await this.playlistRepository.delete(id);

    return true;
  }
}
