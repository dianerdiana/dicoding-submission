import { ApiResponse } from '../../common/ApiResponse';
import { BadRequestError } from '../../common/AppError';
import { serviceContainer } from '../../common/ServiceContainer';
import { SanitizedSongsResponseDto } from '../songs/song.dto';
import { SongService } from '../songs/song.service';
import { SanitizedUsersResponseDto } from '../users/user.dto';
import { UserService } from '../users/user.service';
import { CreatePlaylistSongActivityDto } from './playlist-song-activity.dto';
import { PlaylistSongActivity } from './playlist-song-activity.entity';
import { PlaylistSongActivityRepository } from './playlist-song-activity.repository';

export class PlaylistSongActivityService {
  private activityRepository: PlaylistSongActivityRepository;
  constructor(activityRepository: PlaylistSongActivityRepository) {
    this.activityRepository = activityRepository;
  }

  private getSongService(): SongService {
    return serviceContainer.get<SongService>('SongService');
  }

  private getUserService(): UserService {
    return serviceContainer.get<UserService>('UserService');
  }

  async createActivity(payload: CreatePlaylistSongActivityDto) {
    const activity = new PlaylistSongActivity({ id: '', ...payload });
    console.log(activity);
    const newActivityId = await this.activityRepository.create(activity);
    if (!newActivityId) throw new BadRequestError('Failed create activity');

    return new ApiResponse({ data: newActivityId, message: 'Successfuly created activity' });
  }

  async getAllActivityByPlaylistId(playlistId: string) {
    const songService = this.getSongService();
    const userService = this.getUserService();

    const activites = await this.activityRepository.findAllByPlaylistId(playlistId);

    const songIds: string[] = [];
    const userIds: string[] = [];

    activites.forEach((activity) => {
      songIds.push(activity.songId);
      userIds.push(activity.userId);
    });

    const songResponse = await songService.getSongByIds(songIds);
    const userResponse = await userService.getUserByIds(userIds);

    const { songs } = songResponse.data as SanitizedSongsResponseDto;
    const { users } = userResponse.data as SanitizedUsersResponseDto;

    const responseData = activites.map((activity) => ({
      username: users.find((user) => user.id === activity.userId)?.username,
      title: songs.find((song) => song.id === activity.songId)?.title,
      action: activity.action,
      time: activity.time,
    }));

    return new ApiResponse({
      data: {
        playlistId,
        activities: responseData,
      },
    });
  }
}
