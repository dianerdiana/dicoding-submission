import { ApiResponse } from '../../common/ApiResponse';
import { BadRequestError, ForbiddenError, NotFoundError } from '../../common/AppError';
import { serviceContainer } from '../../common/ServiceContainer';
import { PlaylistSongService } from '../playlist-songs/playlist-song.service';
import { GetUserResponseDto } from '../users/user.dto';
import { UserService } from '../users/user.service';
import { Playlist } from './playlist.entity';
import { PlaylistRepository } from './playlist.repository';
import {
  CreatePlaylistPayloadDto,
  GetOwnPlaylistPayloadDto,
  GetAllPlaylistPayloadDto,
  UpdatePlaylistPayloadDto,
  GetPlaylistResponseDto,
  CreatePlaylistResponseDto,
  GetAllPlaylistResponseDto,
  GetOwnPlaylistResponseDto,
  UpdatePlaylistResponseDto,
} from './playlist.dto';

export class PlaylistService {
  private playlistRepository: PlaylistRepository;

  constructor(playlistRepository: PlaylistRepository) {
    this.playlistRepository = playlistRepository;
  }

  private getUserService(): UserService {
    return serviceContainer.get<UserService>('UserService');
  }

  private getPlaylistSongService(): PlaylistSongService {
    return serviceContainer.get<PlaylistSongService>('PlaylistSongService');
  }

  async createPlaylist(payload: CreatePlaylistPayloadDto) {
    const playlist = new Playlist({ id: '', ...payload, owner: payload.authId });
    const newPlaylist = await this.playlistRepository.create(playlist);
    if (!newPlaylist) throw new BadRequestError('Failed create playlist');

    const responseData: CreatePlaylistResponseDto = { playlistId: newPlaylist.id };
    return new ApiResponse({ data: responseData, code: 201 });
  }

  async getAllPlaylists({ name, authId }: GetAllPlaylistPayloadDto) {
    const userService = this.getUserService();

    const playlists = await this.playlistRepository.findAllPlaylists({ name, authId });
    const userResponse = await userService.getUserById(authId);
    const { user } = userResponse.data as GetUserResponseDto;

    const responseData: GetAllPlaylistResponseDto = {
      playlists: playlists.map((playlist) => ({
        id: playlist.id,
        name: playlist.name,
        username: user.username,
      })),
    };

    return new ApiResponse({ data: responseData });
  }

  async getPlaylistById(playlistId: string) {
    const playlist = await this.playlistRepository.findById(playlistId);
    if (!playlist) throw new NotFoundError('Playlist is not found');

    const responseData: GetPlaylistResponseDto = { playlist };
    return new ApiResponse({ data: responseData });
  }

  async getOwnPlaylistById({ playlistId, authId }: GetOwnPlaylistPayloadDto) {
    const userService = this.getUserService();
    const playlistResponse = await this.getPlaylistById(playlistId);
    const userResponse = await userService.getUserById(authId);
    const { playlist } = playlistResponse.data as GetPlaylistResponseDto;
    const { user } = userResponse.data as GetUserResponseDto;

    if (playlist.owner !== authId) throw new ForbiddenError('Forbidden request');

    const responseData: GetOwnPlaylistResponseDto = {
      playlist: {
        ...playlist,
        username: user.username,
      },
    };
    return new ApiResponse({ data: responseData });
  }

  async updatePlaylist(id: string, payload: UpdatePlaylistPayloadDto) {
    const userService = this.getUserService();
    const playlistResponse = await this.getPlaylistById(id);
    const { playlist: existingPlaylist } = playlistResponse.data as GetPlaylistResponseDto;

    const userResponse = await userService.getUserById(payload.authId);
    const { user } = userResponse.data as GetUserResponseDto;

    const playlist = new Playlist(existingPlaylist);
    playlist.update(payload);

    const updatedPlaylist = await this.playlistRepository.update(id, playlist);
    if (!updatedPlaylist) throw new BadRequestError('Failed update playlist');

    const responseData: UpdatePlaylistResponseDto = {
      playlist: {
        ...updatedPlaylist,
        username: user.username,
      },
    };

    return new ApiResponse({ data: responseData });
  }

  async deletePlaylist(id: string) {
    await this.playlistRepository.delete(id);

    return new ApiResponse({ message: 'Successfuly deleted playlist' });
  }
}
