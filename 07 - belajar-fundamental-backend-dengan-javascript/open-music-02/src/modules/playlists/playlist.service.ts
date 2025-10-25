import { ApiResponse } from '../../common/ApiResponse';
import { BadRequestError, ForbiddenError, NotFoundError } from '../../common/AppError';
import { serviceContainer } from '../../common/ServiceContainer';
import { PlaylistSongService } from '../playlist-songs/playlist-song.service';
import { SanitizedUserResponseDTO } from '../users/user.dto';
import { UserService } from '../users/user.service';
import { Playlist } from './playlist.entity';
import { PlaylistRepository } from './playlist.repository';
import {
  AddSongToPlaylistDTO,
  SanitizedAllPlaylistsResponseDTO,
  CreatePlaylistDTO,
  SanitizedPlaylistResponseDTO,
  PlaylistSearchParamDTO,
  UpdatePlaylistDTO,
  PlaylistResponseDTO,
} from './playlist.dto';

export class PlaylistService {
  private playlistRepository: PlaylistRepository;

  constructor(playlistRepository: PlaylistRepository) {
    this.playlistRepository = playlistRepository;
  }

  getUserService(): UserService {
    return serviceContainer.get<UserService>('UserService');
  }

  getPlaylistSongService(): PlaylistSongService {
    return serviceContainer.get<PlaylistSongService>('PlaylistSongService');
  }

  async validatePlaylistId(id: string) {
    const playlist = await this.playlistRepository.findById(id);
    if (!playlist) throw new NotFoundError('Playlist is not found');

    const responseData: PlaylistResponseDTO = { playlist };
    return new ApiResponse({ data: responseData });
  }

  async createPlaylist(payload: CreatePlaylistDTO) {
    const playlist = new Playlist({ id: '', ...payload });
    const newPlaylist = await this.playlistRepository.create(playlist);
    if (!newPlaylist) throw new BadRequestError('Input is not valid');

    return new ApiResponse({ data: { playlistId: newPlaylist.id }, code: 201 });
  }

  async getAllPlaylists({ name, owner }: PlaylistSearchParamDTO) {
    const userService = this.getUserService();

    const playlists = await this.playlistRepository.findAllPlaylists({ name, owner });
    const userResponse = await userService.getUserById(owner);
    const { user } = userResponse.data as SanitizedUserResponseDTO;

    const sanitizedPlaylist = playlists.map((playlist) => ({
      id: playlist.id,
      name: playlist.name,
      username: user.username,
      createdAt: playlist.createdAt,
      updatedAt: playlist.updatedAt,
    }));
    const responseData: SanitizedAllPlaylistsResponseDTO = {
      playlists: sanitizedPlaylist,
    };

    return new ApiResponse({ data: responseData });
  }

  async getPlaylistById({ id, owner }: { id: string; owner: string }) {
    const userService = this.getUserService();
    const existingPlaylist = await this.playlistRepository.findById(id);

    if (!existingPlaylist) throw new NotFoundError(`Playlist with id ${id} is not found`);
    if (existingPlaylist.owner !== owner)
      throw new ForbiddenError('You are not allowed to see the playlist');

    const userResponse = await userService.getUserById(owner);
    const { user } = userResponse.data as SanitizedUserResponseDTO;
    const responseData: SanitizedPlaylistResponseDTO = {
      playlist: {
        id: existingPlaylist.id,
        name: existingPlaylist.name,
        username: user.username,
        createdAt: existingPlaylist.createdAt,
        updatedAt: existingPlaylist.updatedAt,
      },
    };

    return new ApiResponse({ data: responseData });
  }

  async updatePlaylist(id: string, payload: UpdatePlaylistDTO) {
    const userService = this.getUserService();
    const existingPlaylist = await this.playlistRepository.findById(id);
    if (!existingPlaylist) throw new NotFoundError(`Playlist with id ${id} is not found`);

    const userResponse = await userService.getUserById(payload.owner);
    const { user } = userResponse.data as SanitizedUserResponseDTO;

    const playlist = new Playlist(existingPlaylist);
    playlist.update(payload);

    const updatedPlaylist = await this.playlistRepository.update(id, playlist);
    if (!updatedPlaylist) throw new BadRequestError('Failed update playlist');

    const responseData: SanitizedPlaylistResponseDTO = {
      playlist: {
        id: updatedPlaylist.id,
        name: updatedPlaylist.name,
        username: user.username,
        createdAt: updatedPlaylist.createdAt,
        updatedAt: updatedPlaylist.updatedAt,
      },
    };

    return new ApiResponse({ data: responseData });
  }

  async deletePlaylist(id: string) {
    await this.playlistRepository.delete(id);

    return new ApiResponse({ message: 'Successfuly deleted playlist' });
  }

  async addSongToPlaylist({ id, songId, owner }: AddSongToPlaylistDTO) {
    const playlistSongService = this.getPlaylistSongService();
    const playlistSongId = await playlistSongService.createPlaylistSong({
      playlistId: id,
      songId,
      owner,
    });

    return playlistSongId;
  }

  async getPlaylistWithAllSongsById({ id, owner }: { id: string; owner: string }) {
    const playlistSongService = this.getPlaylistSongService();
    const playlistWithSongs = await playlistSongService.getAllSongsByPlaylistId({
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
    const playlistSongService = this.getPlaylistSongService();
    await playlistSongService.deleteSongInPlaylistByPlaylistIdAndSongId({
      playlistId: id,
      songId,
      owner,
    });

    return true;
  }
}
