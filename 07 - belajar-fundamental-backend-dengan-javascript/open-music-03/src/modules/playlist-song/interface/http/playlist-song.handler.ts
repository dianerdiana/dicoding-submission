import { HapiHandler } from '../../../../shared/types/hapi-handler.type';
import { AuthCredential } from '../../../../shared/types/auth-credential.type';
import { AddSongToPlaylistUseCase } from '../../application/use-case/add-song-to-playlist.use-case';
import { validateAddSongToPlaylist } from '../validators/add-song-to-playlist.validator';

export class PlaylistSongHandler {
  constructor(private readonly addSongToPlaylistUseCase: AddSongToPlaylistUseCase) {}

  createPlaylist: HapiHandler = async (req, h) => {
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
}
