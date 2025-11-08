import { CreatePlaylistUseCase } from '../../application/use-case/create-playlist.use-case';
import { DeletePlaylistUseCase } from '../../application/use-case/delete-playlist.use-case';
import { HapiHandler } from '../../../../shared/types/hapi-handler.type';
import { validateCreatePlaylist } from '../validators/create-playlist.validator';
import { GetAllPlaylistsUseCase } from '../../application/use-case/get-all-playlists.use-case';
import { AuthCredential } from '../../../../shared/types/auth-credential.type';

export class PlaylistHandler {
  constructor(
    private readonly createPlaylistUseCase: CreatePlaylistUseCase,
    private readonly getAllPlaylistsUseCase: GetAllPlaylistsUseCase,
    private readonly deletePlaylistUseCase: DeletePlaylistUseCase,
  ) {}

  createPlaylist: HapiHandler = async (req, h) => {
    const { userId } = req.auth.credentials as AuthCredential;

    console.log(userId);
    const payload = await validateCreatePlaylist(req.payload);
    const playlistId = await this.createPlaylistUseCase.execute(userId, payload);

    return h
      .response({
        status: 'success',
        message: 'Successfuly created playlist',
        data: { playlistId },
      })
      .code(201);
  };

  getAllPlaylists: HapiHandler = async (req, h) => {
    const { userId } = req.auth.credentials as AuthCredential;
    const playlists = await this.getAllPlaylistsUseCase.execute(userId);

    return h.response({
      status: 'success',
      data: { playlists },
    });
  };

  deletePlaylist: HapiHandler = async (req, h) => {
    const { userId } = req.auth.credentials as AuthCredential;
    await this.deletePlaylistUseCase.execute(userId, req.params.id);

    return h.response({
      status: 'success',
      message: 'Successfuly deleted playlist',
    });
  };
}
