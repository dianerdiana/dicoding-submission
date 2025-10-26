import { ApiResponse } from '../../common/ApiResponse';
import { ValidationError } from '../../common/AppError';
import { serviceContainer } from '../../common/ServiceContainer';
import { PlaylistSongActivityService } from '../playlist-song-activities/playlist-song-activity.service';
import { SanitizedPlaylistResponseDto, ValidatePlaylistOwnerDto } from '../playlists/playlist.dto';
import { PlaylistService } from '../playlists/playlist.service';
import { SongService } from '../songs/song.service';
import {
  AddSongToPlaylistDto,
  NewPlaylistSongResponseDto,
  PlaylistWithAllSongsDto,
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

  async addSongToPlaylistSong({ playlistId, songId, userId }: AddSongToPlaylistDto) {
    const playlistService = this.getPlaylistService();
    const songService = this.getSongService();
    const activityService = this.getPlaylistSongActivityService();

    await songService.validateSongById(songId);
    await playlistService.getOwnPlaylistById({ playlistId, userId });

    const playlistSong = new PlaylistSong({ id: '', playlistId, songId });
    const newPlaylistSong = await this.playlistSongRepository.create(playlistSong);
    if (!newPlaylistSong) throw new ValidationError('Input is not valid');

    const newPlaylistSongResponse: NewPlaylistSongResponseDto = {
      playlistSongId: newPlaylistSong.id,
    };

    await activityService.createActivity({ playlistId, songId, userId, action: 'add' });
    return new ApiResponse({
      message: 'Successfuly add song to playlist',
      data: newPlaylistSongResponse,
      code: 201,
    });
  }

  async getAllSongsByPlaylistId({ playlistId, userId }: ValidatePlaylistOwnerDto) {
    const playlistService = this.getPlaylistService();
    const playlistResponse = await playlistService.getOwnPlaylistById({ playlistId, userId });
    const { playlist } = playlistResponse.data as SanitizedPlaylistResponseDto;

    const songsResponse = await this.playlistSongRepository.findAllSongsByPlaylistId(playlistId);
    const responseData: PlaylistWithAllSongsDto = {
      playlist: {
        id: playlist.id,
        name: playlist.name,
        username: playlist.username,
        songs: songsResponse,
      },
    };
    return new ApiResponse({ data: responseData });
  }

  async deleteSongInPlaylistByPlaylistIdAndSongId({
    playlistId,
    songId,
    userId,
  }: {
    playlistId: string;
    songId: string;
    userId: string;
  }) {
    const playlistService = this.getPlaylistService();
    const songService = this.getSongService();
    const activityService = this.getPlaylistSongActivityService();

    await songService.validateSongById(songId);
    await playlistService.getOwnPlaylistById({ playlistId, userId });

    await this.playlistSongRepository.delete({ playlistId, songId });
    await activityService.createActivity({ playlistId, songId, userId, action: 'delete' });
    return new ApiResponse({ message: 'Successfuly deleted song' });
  }
}
