import { ApiResponse } from '../../common/ApiResponse';
import { BadRequestError, ForbiddenError, NotFoundError } from '../../common/AppError';
import { serviceContainer } from '../../common/ServiceContainer';
import { GetAllUserResponseDto, GetUserResponseDto } from '../users/user.dto';
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
import { CollaborationService } from '../collaborations/collaboration.service';

export class PlaylistService {
  private playlistRepository: PlaylistRepository;

  constructor(playlistRepository: PlaylistRepository) {
    this.playlistRepository = playlistRepository;
  }

  private getUserService(): UserService {
    return serviceContainer.get<UserService>('UserService');
  }

  private getCollaborationService(): CollaborationService {
    return serviceContainer.get<CollaborationService>('CollaborationService');
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
    const collaborationService = this.getCollaborationService();

    let playlists = [];

    const { data: collaborationResponse } = await collaborationService.getAllCollaborations(authId);

    if (
      collaborationResponse &&
      collaborationResponse.collaborations &&
      collaborationResponse.collaborations.length
    ) {
      const { collaborations } = collaborationResponse;
      const playlistIds: string[] = [];

      collaborations.forEach((c) => playlistIds.push(c.playlistId));
      playlists = await this.playlistRepository.findByIds(playlistIds);
    } else {
      playlists = await this.playlistRepository.findAllPlaylists({ name, authId });
    }

    const userIds = playlists.map((p) => p.owner);
    const userResponse = await userService.getUserByIds(userIds);
    const { users } = userResponse.data as GetAllUserResponseDto;

    const responseData: GetAllPlaylistResponseDto = {
      playlists: playlists.map((playlist) => ({
        id: playlist.id,
        name: playlist.name,
        username: users.find((user) => playlist.owner === user.id)?.username || '',
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
