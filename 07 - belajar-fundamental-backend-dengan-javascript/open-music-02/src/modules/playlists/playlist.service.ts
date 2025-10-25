import { ApiResponse } from '../../common/ApiResponse';
import { BadRequestError, ForbiddenError, NotFoundError } from '../../common/AppError';
import { serviceContainer } from '../../common/ServiceContainer';
import { PlaylistSongService } from '../playlist-songs/playlist-song.service';
import { SanitizedUserResponseDto } from '../users/user.dto';
import { UserService } from '../users/user.service';
import { Playlist } from './playlist.entity';
import { PlaylistRepository } from './playlist.repository';
import {
  SanitizedAllPlaylistsResponseDto,
  CreatePlaylistDto,
  SanitizedPlaylistResponseDto,
  PlaylistSearchParamDto,
  UpdatePlaylistDto,
  PlaylistResponseDto,
  ValidatePlaylistOwnerDto,
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

    const responseData: PlaylistResponseDto = { playlist };
    return new ApiResponse({ data: responseData });
  }

  async validatePlaylistOwner({ playlistId, userId }: ValidatePlaylistOwnerDto) {
    const userService = this.getUserService();
    const playlistResponse = await this.validatePlaylistId(playlistId);
    const userResponse = await userService.getUserById(userId);
    const { playlist } = playlistResponse.data as PlaylistResponseDto;
    const { user } = userResponse.data as SanitizedUserResponseDto;

    if (playlist.owner !== userId) throw new ForbiddenError('Forbidden request');

    const responseData: SanitizedPlaylistResponseDto = {
      playlist: {
        id: playlist.id,
        name: playlist.name,
        username: user.username,
      },
    };
    return new ApiResponse({ data: responseData });
  }

  async createPlaylist(payload: CreatePlaylistDto) {
    const playlist = new Playlist({ id: '', ...payload, owner: payload.userId });
    const newPlaylist = await this.playlistRepository.create(playlist);
    if (!newPlaylist) throw new BadRequestError('Input is not valid');

    return new ApiResponse({ data: { playlistId: newPlaylist.id }, code: 201 });
  }

  async getAllPlaylists({ name, userId }: PlaylistSearchParamDto) {
    const userService = this.getUserService();

    const playlists = await this.playlistRepository.findAllPlaylists({ name, userId });
    const userResponse = await userService.getUserById(userId);
    const { user } = userResponse.data as SanitizedUserResponseDto;

    const sanitizedPlaylist = playlists.map((playlist) => ({
      id: playlist.id,
      name: playlist.name,
      username: user.username,
    }));
    const responseData: SanitizedAllPlaylistsResponseDto = {
      playlists: sanitizedPlaylist,
    };

    return new ApiResponse({ data: responseData });
  }

  async getPlaylistById({ playlistId, userId }: ValidatePlaylistOwnerDto) {
    const playlistResponse = await this.validatePlaylistOwner({ playlistId, userId });
    const { playlist } = playlistResponse.data as SanitizedPlaylistResponseDto;
    const responseData: SanitizedPlaylistResponseDto = {
      playlist: {
        id: playlist.id,
        name: playlist.name,
        username: playlist.username,
      },
    };

    return new ApiResponse({ data: responseData });
  }

  async updatePlaylist(id: string, payload: UpdatePlaylistDto) {
    const userService = this.getUserService();
    const playlistResponse = await this.validatePlaylistId(id);
    const { playlist: existingPlaylist } = playlistResponse.data as PlaylistResponseDto;

    const userResponse = await userService.getUserById(payload.userId);
    const { user } = userResponse.data as SanitizedUserResponseDto;

    const playlist = new Playlist(existingPlaylist);
    playlist.update(payload);

    const updatedPlaylist = await this.playlistRepository.update(id, playlist);
    if (!updatedPlaylist) throw new BadRequestError('Failed update playlist');

    const responseData: SanitizedPlaylistResponseDto = {
      playlist: {
        id: updatedPlaylist.id,
        name: updatedPlaylist.name,
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
