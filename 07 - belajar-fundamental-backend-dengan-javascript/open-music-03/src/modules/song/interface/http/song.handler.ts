import { CreateSongUseCase } from '../../application/use-case/create-song.use-case';
import { GetSongByIdUseCase } from '../../application/use-case/get-song-by-id.use-case';
import { UpdateSongUseCase } from '../../application/use-case/update-song.use-case';
import { DeleteSongUseCase } from '../../application/use-case/delete-song.use-case';
import { HapiHandler } from '../../../../shared/types/hapi-handler.type';
import { validateCreateSong } from '../validators/create-song.validator';
import { validateUpdateSong } from '../validators/update-song.validator';
import { GetAllSongsUseCase } from '../../application/use-case/get-all-songs.use-case';
import { validateSongSearchParam } from '../validators/song-search-param.validator';
import { ApiResponse } from '../../../../shared/utils/api-response';

export class SongHandler {
  constructor(
    private readonly createSongUseCase: CreateSongUseCase,
    private readonly getAllSongsUseCase: GetAllSongsUseCase,
    private readonly getSongByIdUseCase: GetSongByIdUseCase,
    private readonly updateSongUseCase: UpdateSongUseCase,
    private readonly deleteSongUseCase: DeleteSongUseCase,
  ) {}

  createSong: HapiHandler = async (req) => {
    const payload = await validateCreateSong(req.payload);
    const songId = await this.createSongUseCase.execute(payload);

    return ApiResponse.created({ data: { songId }, message: 'Successfuly created song' });
  };

  getAllSongs: HapiHandler = async (req) => {
    const payload = await validateSongSearchParam(req.query);
    const songs = await this.getAllSongsUseCase.execute(payload);

    return ApiResponse.success({ data: { songs } });
  };

  getSongById: HapiHandler = async (req) => {
    const song = await this.getSongByIdUseCase.execute(req.params.id);

    return ApiResponse.success({ data: { song } });
  };

  updateSong: HapiHandler = async (req) => {
    const payload = await validateUpdateSong(req.payload);
    const song = await this.updateSongUseCase.execute(req.params.id, payload);

    return ApiResponse.updated({
      message: 'Successfuly updated song',
      data: { song },
    });
  };

  deleteSong: HapiHandler = async (req) => {
    await this.deleteSongUseCase.execute(req.params.id);

    return ApiResponse.deleted({
      message: 'Successfuly deleted song',
    });
  };
}
