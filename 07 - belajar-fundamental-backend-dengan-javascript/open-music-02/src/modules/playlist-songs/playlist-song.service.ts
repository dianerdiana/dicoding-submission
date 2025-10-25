import { ApiResponse } from '../../common/ApiResponse';
import { ValidationError } from '../../common/AppError';
import { serviceContainer } from '../../common/ServiceContainer';
import { PlaylistService } from '../playlists/playlist.service';
import { SongService } from '../songs/song.service';
import { AddSongToPlaylistDTO, NewPlaylistSongResponseDTO } from './playlist-song.dto';
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

  async createPlaylistSong({ playlistId, songId, owner }: AddSongToPlaylistDTO) {
    const playlistService = this.getPlaylistService();
    const songService = this.getSongService();

    await songService.getSongById(songId);
    await playlistService.getPlaylistById({ id: playlistId, owner });

    const playlistSong = new PlaylistSong({ id: '', playlistId, songId });
    const newPlaylistSong = await this.playlistSongRepository.create(playlistSong);
    if (!newPlaylistSong) throw new ValidationError('Input is not valid');

    const newPlaylistSongResponse: NewPlaylistSongResponseDTO = {
      playlistSongId: newPlaylistSong.id,
    };
    return new ApiResponse({ data: newPlaylistSongResponse });
  }

  async getAllSongsByPlaylistId({ playlistId, owner }: { playlistId: string; owner: string }) {
    const playlistService = this.getPlaylistService();
    const playlist = await playlistService.getPlaylistById({ id: playlistId, owner });

    const playlistWithSongs =
      await this.playlistSongRepository.findAllSongsByPlaylistId(playlistId);
    return {
      ...playlist,
      songs: playlistWithSongs,
    };
  }

  async deleteSongInPlaylistByPlaylistIdAndSongId({
    playlistId,
    songId,
    owner,
  }: {
    playlistId: string;
    songId: string;
    owner: string;
  }) {
    const playlistService = serviceContainer.get<PlaylistService>('PlaylistService');
    const songService = serviceContainer.get<SongService>('SongService');

    await songService.getSongById(songId);
    await playlistService.getPlaylistById({ id: playlistId, owner });

    await this.playlistSongRepository.delete({ playlistId, songId });

    return true;
  }
}
