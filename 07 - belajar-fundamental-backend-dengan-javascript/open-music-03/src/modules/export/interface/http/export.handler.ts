import { AuthCredential } from '../../../../shared/types/auth-credential.type';
import { HapiHandler } from '../../../../shared/types/hapi-handler.type';
import { ApiResponse } from '../../../../shared/utils/api-response';
import { ExportPlaylistSongsUseCase } from '../../application/use-case/export-playlist-song.use-case';
import { validateExportPlaylistSong } from '../validators/export-playlist-song.validator';

export class ExportHandler {
  constructor(private readonly exportPlaylistSongsUseCase: ExportPlaylistSongsUseCase) {}

  exportPlaylistSongs: HapiHandler = async (req) => {
    const { userId } = req.auth.credentials as AuthCredential;
    const payload = await validateExportPlaylistSong(req.payload);

    const playlist = await this.exportPlaylistSongsUseCase.execute({
      ...payload,
      userId,
      playlistId: req.params.playlistId,
    });

    return ApiResponse.created({
      data: { playlist },
      message: 'Permintaan Anda sedang kami proses',
    });
  };
}
