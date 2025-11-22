import { HapiHandler } from '../../../../shared/types/hapi-handler.type';
import { AuthCredential } from '../../../../shared/types/auth-credential.type';
import { AddSongToPlaylistUseCase } from '../../application/use-case/add-song-to-playlist.use-case';
import { validateAddSongToPlaylist } from '../validators/add-song-to-playlist.validator';
import { GetPlaylistSongsUseCase } from '../../application/use-case/get-playlist-songs.use-case';
import { DeleteSongFromPlaylistUseCase } from '../../application/use-case/delete-song-from-playlist.use-case';
import { validateDeleteSongFromPlaylist } from '../validators/delete-song-from-playlist.validator';
import { ApiResponse } from '../../../../shared/utils/api-response';

export class PlaylistSongHandler {
  constructor(
    private readonly addSongToPlaylistUseCase: AddSongToPlaylistUseCase,
    private readonly getPlaylistSongsUseCase: GetPlaylistSongsUseCase,
    private readonly deleteSongFromPlaylistUseCase: DeleteSongFromPlaylistUseCase,
  ) {}

  addSongToPlaylist: HapiHandler = async (req) => {
    const { userId } = req.auth.credentials as AuthCredential;

    const payload = await validateAddSongToPlaylist(req.payload);
    const playlistSongId = await this.addSongToPlaylistUseCase.execute({
      userId,
      songId: payload.songId,
      playlistId: req.params.id,
    });

    return ApiResponse.created({
      message: 'Successfuly added song to playlist',
      data: { playlistSongId },
    });
  };

  getPlaylistSongs: HapiHandler = async (req) => {
    const { userId } = req.auth.credentials as AuthCredential;

    const playlist = await this.getPlaylistSongsUseCase.execute({
      userId,
      playlistId: req.params.id,
    });

    return ApiResponse.success({
      data: { playlist },
    });
  };

  deleteSongFromPlaylist: HapiHandler = async (req) => {
    const { userId } = req.auth.credentials as AuthCredential;

    const payload = await validateDeleteSongFromPlaylist(req.payload);
    const deleted = await this.deleteSongFromPlaylistUseCase.execute({
      playlistId: req.params.id,
      songId: payload.songId,
      userId,
    });

    return ApiResponse.deleted({
      message: 'Successfuly deleted song from playlist',
      data: deleted,
    });
  };
}
