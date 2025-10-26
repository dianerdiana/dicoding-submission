import { AuthCredential } from '../../types/AuthCredential';
import { HapiHandler } from '../../types/hapi';
import { validateUUID } from '../../utils/validateUUID';
import { validateSongIdSchema } from './playlist-song.schema';
import { PlaylistSongService } from './playlist-song.service';

export class PlaylistSongHandler {
  private playlistSongService: PlaylistSongService;
  constructor(playlistSongService: PlaylistSongService) {
    this.playlistSongService = playlistSongService;
  }

  addSongToPlaylistSong: HapiHandler = async (req) => {
    const { id: playlistId } = req.params;
    const { songId } = await validateSongIdSchema.parseAsync(req.payload);
    const { authId } = req.auth.credentials as AuthCredential;

    validateUUID(playlistId);
    validateUUID(songId);

    const response = await this.playlistSongService.addSongToPlaylistSong({
      playlistId,
      songId,
      authId,
    });
    return response;
  };

  getPlaylistWithAllSongs: HapiHandler = async (req) => {
    const { id: playlistId } = req.params;
    const { authId } = req.auth.credentials as AuthCredential;

    validateUUID(playlistId);

    const response = await this.playlistSongService.getPlaylistWithAllSongsByPlaylistId({
      playlistId,
      authId,
    });

    return response;
  };

  deleteSongFromPlaylistByPlaylistId: HapiHandler = async (req) => {
    const { id: playlistId } = req.params;
    const { authId } = req.auth.credentials as AuthCredential;
    const { songId } = await validateSongIdSchema.parseAsync(req.payload);
    validateUUID(playlistId);

    const response = await this.playlistSongService.deleteSongInPlaylistByPlaylistIdAndSongId({
      playlistId,
      songId,
      authId,
    });

    return response;
  };
}
