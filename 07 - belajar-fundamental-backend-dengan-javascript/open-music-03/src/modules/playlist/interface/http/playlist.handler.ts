import { CreatePlaylistUseCase } from '../../application/use-case/create-playlist.use-case';
import { DeletePlaylistUseCase } from '../../application/use-case/delete-playlist.use-case';
import { HapiHandler } from '../../../../shared/types/hapi-handler.type';
import { validateCreatePlaylist } from '../validators/create-playlist.validator';
import { GetAllPlaylistsUseCase } from '../../application/use-case/get-all-playlists.use-case';
import { AuthCredential } from '../../../../shared/types/auth-credential.type';
import { ApiResponse } from '../../../../shared/utils/api-response';

export class PlaylistHandler {
  constructor(
    private readonly createPlaylistUseCase: CreatePlaylistUseCase,
    private readonly getAllPlaylistsUseCase: GetAllPlaylistsUseCase,
    private readonly deletePlaylistUseCase: DeletePlaylistUseCase,
  ) {}

  createPlaylist: HapiHandler = async (req) => {
    const { userId } = req.auth.credentials as AuthCredential;

    const payload = await validateCreatePlaylist(req.payload);
    const playlistId = await this.createPlaylistUseCase.execute(userId, payload);

    return ApiResponse.created({ message: 'Successfuly created playlist', data: { playlistId } });
  };

  getAllPlaylists: HapiHandler = async (req) => {
    const { userId } = req.auth.credentials as AuthCredential;
    const playlists = await this.getAllPlaylistsUseCase.execute(userId);

    return ApiResponse.success({ data: { playlists } });
  };

  deletePlaylist: HapiHandler = async (req) => {
    const { userId } = req.auth.credentials as AuthCredential;
    await this.deletePlaylistUseCase.execute(userId, req.params.id);

    return ApiResponse.deleted({ message: 'Successfuly deleted playlist' });
  };
}
