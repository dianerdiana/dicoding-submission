import { ValidationError } from '../../common/AppError';
import { serviceContainer } from '../../common/ServiceContainer';
import { PlaylistService } from '../playlists/playlist.service';
import { SongService } from '../songs/song.service';
import { PlaylistSong } from './playlist-song.entity';
import { PlaylistSongRepository } from './playlist-song.repository';
import { AddSongToPlaylistPayload } from './playlist-song.schema.entity';

export class PlaylistSongService {
  private playlistSongRepository: PlaylistSongRepository;

  constructor(playlistSongRepository: PlaylistSongRepository) {
    this.playlistSongRepository = playlistSongRepository;
  }

  async createPlaylistSong({ playlistId, songId, owner }: AddSongToPlaylistPayload) {
    const playlistService = serviceContainer.get<PlaylistService>('PlaylistService');
    const songService = serviceContainer.get<SongService>('SongService');

    await songService.getSongById(songId);
    await playlistService.getPlaylistById({ id: playlistId, owner });

    const playlistSong = new PlaylistSong({ id: '', playlistId, songId });
    const newPlaylistSong = await this.playlistSongRepository.create(playlistSong);

    if (!newPlaylistSong) {
      throw new ValidationError('Input is not valid');
    }

    return newPlaylistSong.id;
  }

  async getAllSongsByPlaylistId({ playlistId, owner }: { playlistId: string; owner: string }) {
    const playlistService = serviceContainer.get<PlaylistService>('PlaylistService');
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
