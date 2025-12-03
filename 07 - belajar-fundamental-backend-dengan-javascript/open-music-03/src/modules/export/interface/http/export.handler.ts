import { AuthCredential } from '../../../../shared/types/auth-credential.type';
import { HapiHandler } from '../../../../shared/types/hapi-handler.type';
import { ApiResponse } from '../../../../shared/utils/api-response';
import { ExportPlaylistSongsUseCase } from '../../application/use-case/export-playlist-song.use-case';

export class ExportHandler {
  constructor(private readonly exportPlaylistSongsUseCase: ExportPlaylistSongsUseCase) {}

  exportPlaylistSongs: HapiHandler = async (req) => {
    const { userId } = req.auth.credentials as AuthCredential;

    const playlist = await this.exportPlaylistSongsUseCase.execute({
      userId,
      playlistId: req.params.playlistId,
    });

    return ApiResponse.success({
      data: { playlist },
      message: 'Permintaan Anda sedang kami proses',
    });
  };
}
