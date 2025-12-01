import { AuthCredential } from '../../../../shared/types/auth-credential.type';
import { HapiHandler } from '../../../../shared/types/hapi-handler.type';
import { ApiResponse } from '../../../../shared/utils/api-response';
import { GetAllPlaylistSongActivityByPlaylistIdUseCase } from '../../application/use-case/get-all-playlist-song-activity-by-playlist-id.use-case';

export class PlaylistSongActivityHandler {
  constructor(
    private readonly getAllPlaylistSongActivityByPlaylistIdUseCase: GetAllPlaylistSongActivityByPlaylistIdUseCase,
  ) {}

  getAllPlaylistSongActivityByPlaylistId: HapiHandler = async (req) => {
    const { userId } = req.auth.credentials as AuthCredential;
    const { id: playlistId } = req.params;
    const response = await this.getAllPlaylistSongActivityByPlaylistIdUseCase.execute(
      playlistId,
      userId,
    );

    return ApiResponse.success({ data: response });
  };
}
