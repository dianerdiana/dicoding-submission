import { ExportPlaylistSongProducer } from '../../../../app/producers/playlist-song/export-playlist-song.producer';
import { SERVICE_KEYS } from '../../../../shared/constants/service-keys.constant';
import { serviceContainer } from '../../../../shared/utils/service-container';
import { GetPlaylistByIdUseCase } from '../../../playlist/application/use-case/get-playlist-by-id.use-case';
import { ExportPlaylistSongDto } from '../dto/export-playlist-song.dto';

export class ExportPlaylistSongsUseCase {
  constructor(private readonly exportPlaylistSongProducer: ExportPlaylistSongProducer) {}

  async execute(payload: { playlistId: string; userId: string } & ExportPlaylistSongDto) {
    const getPlaylistByIdUseCase = serviceContainer.get<GetPlaylistByIdUseCase>(
      SERVICE_KEYS.GET_PLAYLIST_BY_ID_USE_CASE,
    );

    const { playlistId, userId, targetEmail } = payload;
    const playlist = await getPlaylistByIdUseCase.execute({ playlistId, userId });
    await this.exportPlaylistSongProducer.execute({ playlistId: playlist.id, targetEmail });

    return true;
  }
}
