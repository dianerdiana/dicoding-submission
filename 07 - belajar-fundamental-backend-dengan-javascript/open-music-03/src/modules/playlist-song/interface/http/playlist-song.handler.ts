import { HapiHandler } from '../../../../shared/types/hapi-handler.type';
import { AuthCredential } from '../../../../shared/types/auth-credential.type';
import { AddSongToPlaylistUseCase } from '../../application/use-case/add-song-to-playlist.use-case';
import { validateAddSongToPlaylist } from '../validators/add-song-to-playlist.validator';
import { GetPlaylistSongsUseCase } from '../../application/use-case/get-playlist-songs.use-case';
import { DeleteSongFromPlaylistUseCase } from '../../application/use-case/delete-song-from-playlist.use-case';
import { validateDeleteSongFromPlaylist } from '../validators/delete-song-from-playlist.validator';

export class PlaylistSongHandler {
  constructor(
    private readonly addSongToPlaylistUseCase: AddSongToPlaylistUseCase,
    private readonly getPlaylistSongsUseCase: GetPlaylistSongsUseCase,
    private readonly deleteSongFromPlaylistUseCase: DeleteSongFromPlaylistUseCase,
  ) {}

  addSongToPlaylist: HapiHandler = async (req, h) => {
    const { userId } = req.auth.credentials as AuthCredential;

    const payload = await validateAddSongToPlaylist(req.payload);
    const playlistSongId = await this.addSongToPlaylistUseCase.execute({
      userId,
      songId: payload.songId,
      playlistId: req.params.id,
    });

    return h
      .response({
        status: 'success',
        message: 'Successfuly added song to playlist',
        data: { playlistSongId },
      })
      .code(201);
  };

  getPlaylistSongs: HapiHandler = async (req, h) => {
    const { userId } = req.auth.credentials as AuthCredential;

    const playlist = await this.getPlaylistSongsUseCase.execute({
      userId,
      playlistId: req.params.id,
    });

    return h.response({
      status: 'success',
      data: { playlist },
    });
  };

  deleteSongFromPlaylist: HapiHandler = async (req, h) => {
    const { userId } = req.auth.credentials as AuthCredential;

    const payload = await validateDeleteSongFromPlaylist(req.payload);
    const deleted = await this.deleteSongFromPlaylistUseCase.execute({
      playlistId: req.params.id,
      songId: payload.songId,
      userId,
    });

    return h.response({
      status: 'success',
      message: 'Successfuly deleted song from playlist',
      data: deleted,
    });
  };
}
