import { ForbiddenError, NotFoundError, ValidationError } from '../../common/AppError';
import { serviceContainer } from '../../common/ServiceContainer';
import { PlaylistSongService } from '../playlist-songs/playlist-song.service';
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
  private playlistSongService: PlaylistSongService;

  constructor(playlistRepository: PlaylistRepository) {
    this.playlistRepository = playlistRepository;
    this.userService = serviceContainer.get<UserService>('UserService');
    this.playlistSongService = serviceContainer.get<PlaylistSongService>('PlaylistSongService');
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

  async getPlaylistById({ id, owner }: { id: string; owner: string }) {
    const playlist = await this.playlistRepository.findById(id);

    if (!playlist) throw new NotFoundError(`Playlist with id ${id} is not found`);
    if (playlist.owner !== owner)
      throw new ForbiddenError('You are not allowed to see the playlist');

    const user = await this.userService.getUserById(owner);

    return {
      id: playlist.id,
      name: playlist.name,
      username: user.username,
    };
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
    await this.playlistRepository.delete(id);

    return true;
  }

  async addSongToPlaylist({ id, songId, owner }: { id: string; songId: string; owner: string }) {
    const playlistSongId = await this.playlistSongService.createPlaylistSong({
      playlistId: id,
      songId,
      owner,
    });

    return playlistSongId;
  }

  async getPlaylistWithAllSongsById({ id, owner }: { id: string; owner: string }) {
    const playlistWithSongs = await this.playlistSongService.getAllSongsByPlaylistId({
      playlistId: id,
      owner,
    });

    return playlistWithSongs;
  }

  async deleteSongFromPlaylistByIdAndSongId({
    id,
    songId,
    owner,
  }: {
    id: string;
    songId: string;
    owner: string;
  }) {
    await this.playlistSongService.deleteSongInPlaylistByPlaylistIdAndSongId({
      playlistId: id,
      songId,
      owner,
    });

    return true;
  }
}
