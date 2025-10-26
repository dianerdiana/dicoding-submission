import { ApiResponse } from '../../common/ApiResponse';
import { ValidationError } from '../../common/AppError';
import { serviceContainer } from '../../common/ServiceContainer';
import { PlaylistSongActivityService } from '../playlist-song-activities/playlist-song-activity.service';
import { GetOwnPlaylistPayloadDto, GetOwnPlaylistResponseDto } from '../playlists/playlist.dto';
import { PlaylistService } from '../playlists/playlist.service';
import { GetSongByIdsResponseDto } from '../songs/song.dto';
import { SongService } from '../songs/song.service';
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

  async addSongToPlaylistSong({ playlistId, songId, authId }: AddSongToPlaylistPayloadDto) {
    const playlistService = this.getPlaylistService();
    const songService = this.getSongService();
    const activityService = this.getPlaylistSongActivityService();

    await songService.validateSongById(songId);
    await playlistService.getOwnPlaylistById({ playlistId, authId });

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
    const playlistResponse = await playlistService.getOwnPlaylistById({ playlistId, authId });
    const playlistSongs = await this.playlistSongRepository.findAllByPlaylistId(playlistId);

    const songIds = playlistSongs.map((p) => p.songId);
    const songsResponse = await songService.getSongByIds(songIds);
    const { playlist } = playlistResponse.data as GetOwnPlaylistResponseDto;
    const { songs } = songsResponse.data as GetSongByIdsResponseDto;

    const responseData: GetPlaylistWithAllSongsResponseDto = {
      playlist: {
        ...playlist,
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

    await songService.validateSongById(songId);
    await playlistService.getOwnPlaylistById({ playlistId, authId });

    await this.playlistSongRepository.delete({ playlistId, songId });
    await activityService.createActivity({ playlistId, songId, userId: authId, action: 'delete' });
    return new ApiResponse({ message: 'Successfuly deleted song' });
  }
}
