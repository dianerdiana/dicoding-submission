import { ApiResponse } from '../../common/ApiResponse';
import { ValidationError } from '../../common/AppError';
import { serviceContainer } from '../../common/ServiceContainer';
import { CollaborationService } from '../collaborations/collaboration.service';
import { PlaylistSongActivityService } from '../playlist-song-activities/playlist-song-activity.service';
import { GetOwnPlaylistPayloadDto, GetPlaylistResponseDto } from '../playlists/playlist.dto';
import { PlaylistService } from '../playlists/playlist.service';
import { GetSongByIdsResponseDto } from '../songs/song.dto';
import { SongService } from '../songs/song.service';
import { GetUserResponseDto } from '../users/user.dto';
import { UserService } from '../users/user.service';
import {
  AddSongToPlaylistPayloadDto,
  AddSongToPlaylistResponseDto,
  DeleteSongInPlaylistPayloadDto,
  GetPlaylistWithAllSongsResponseDto,
} from './playlist-song.dto';
import { PlaylistSong } from './playlist-song.entity';
import { PlaylistSongRepository } from './playlist-song.repository';

export class PlaylistSongService {
  private playlistSongRepository: PlaylistSongRepository;

  constructor(playlistSongRepository: PlaylistSongRepository) {
    this.playlistSongRepository = playlistSongRepository;
  }

  private getPlaylistService(): PlaylistService {
    return serviceContainer.get<PlaylistService>('PlaylistService');
  }

  private getSongService(): SongService {
    return serviceContainer.get<SongService>('SongService');
  }

  private getPlaylistSongActivityService(): PlaylistSongActivityService {
    return serviceContainer.get<PlaylistSongActivityService>('PlaylistSongActivityService');
  }

  private getCollaborationService(): CollaborationService {
    return serviceContainer.get<CollaborationService>('CollaborationService');
  }

  private getUserService(): UserService {
    return serviceContainer.get<UserService>('UserService');
  }

  async addSongToPlaylistSong({ playlistId, songId, authId }: AddSongToPlaylistPayloadDto) {
    const playlistService = this.getPlaylistService();
    const songService = this.getSongService();
    const activityService = this.getPlaylistSongActivityService();
    const collaborationService = this.getCollaborationService();

    await songService.validateSongById(songId);
    const playlistResponse = await playlistService.getPlaylistById(playlistId);

    if (playlistResponse.data && playlistResponse.data.playlist) {
      if (playlistResponse.data.playlist.owner !== authId) {
        await collaborationService.getCollaboration(authId, playlistId);
      }
    }

    const playlistSong = new PlaylistSong({ id: '', playlistId, songId });
    const newPlaylistSong = await this.playlistSongRepository.create(playlistSong);
    if (!newPlaylistSong) throw new ValidationError('Input is not valid');

    const newPlaylistSongResponse: AddSongToPlaylistResponseDto = {
      playlistSongId: newPlaylistSong.id,
    };

    await activityService.createActivity({ playlistId, songId, userId: authId, action: 'add' });
    return new ApiResponse({
      message: 'Successfuly add song to playlist',
      data: newPlaylistSongResponse,
      code: 201,
    });
  }

  async getPlaylistWithAllSongsByPlaylistId({ playlistId, authId }: GetOwnPlaylistPayloadDto) {
    const playlistService = this.getPlaylistService();
    const songService = this.getSongService();
    const collaborationService = this.getCollaborationService();
    const userService = this.getUserService();

    const playlistResponse = await playlistService.getPlaylistById(playlistId);

    if (playlistResponse.data && playlistResponse.data.playlist) {
      if (playlistResponse.data.playlist.owner !== authId) {
        await collaborationService.getCollaboration(authId, playlistId);
      }
    }

    const playlistSongs = await this.playlistSongRepository.findAllByPlaylistId(playlistId);
    const songIds = playlistSongs.map((p) => p.songId);
    const songsResponse = await songService.getSongByIds(songIds);

    const { playlist } = playlistResponse.data as GetPlaylistResponseDto;
    const { songs } = songsResponse.data as GetSongByIdsResponseDto;

    const userResponse = await userService.getUserById(playlist.owner);
    const { user } = userResponse.data as GetUserResponseDto;

    const responseData: GetPlaylistWithAllSongsResponseDto = {
      playlist: {
        ...playlist,
        username: user.username,
        songs: songs.map((song) => ({
          id: song.id,
          title: song.title,
          performer: song.performer,
        })),
      },
    };
    return new ApiResponse({ data: responseData });
  }

  async deleteSongInPlaylistByPlaylistIdAndSongId({
    playlistId,
    songId,
    authId,
  }: DeleteSongInPlaylistPayloadDto) {
    const playlistService = this.getPlaylistService();
    const songService = this.getSongService();
    const activityService = this.getPlaylistSongActivityService();
    const collaborationService = this.getCollaborationService();

    await songService.validateSongById(songId);
    const playlistResponse = await playlistService.getPlaylistById(playlistId);

    if (playlistResponse.data && playlistResponse.data.playlist) {
      if (playlistResponse.data.playlist.owner !== authId) {
        await collaborationService.getCollaboration(authId, playlistId);
      }
    }

    await this.playlistSongRepository.delete({ playlistId, songId });
    await activityService.createActivity({ playlistId, songId, userId: authId, action: 'delete' });
    return new ApiResponse({ message: 'Successfuly deleted song' });
  }
}
