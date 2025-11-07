import { CreateSongUseCase } from '../../application/use-case/create-song.use-case';
import { GetSongByIdUseCase } from '../../application/use-case/get-song-by-id.use-case';
import { UpdateSongUseCase } from '../../application/use-case/update-song.use-case';
import { DeleteSongUseCase } from '../../application/use-case/delete-song.use-case';
import { HapiHandler } from '../../../../shared/types/hapi-handler.type';
import { validateCreateSong } from '../validators/create-song.validator';
import { validateUpdateSong } from '../validators/update-song.validator';
import { GetAllSongsUseCase } from '../../application/use-case/get-all-songs.use-case';

export class SongHandler {
  constructor(
    private readonly createSongUseCase: CreateSongUseCase,
    private readonly getAllSongsUseCase: GetAllSongsUseCase,
    private readonly getSongByIdUseCase: GetSongByIdUseCase,
    private readonly updateSongUseCase: UpdateSongUseCase,
    private readonly deleteSongUseCase: DeleteSongUseCase,
  ) {}

  createSong: HapiHandler = async (req, h) => {
    const payload = await validateCreateSong(req.payload);
    const songId = await this.createSongUseCase.execute(payload);

    return h
      .response({
        status: 'success',
        message: 'Successfuly created song',
        data: { songId },
      })
      .code(201);
  };

  getAllSongs: HapiHandler = async (req, h) => {
    const songs = await this.getAllSongsUseCase.execute();

    return h.response({
      status: 'success',
      data: { songs },
    });
  };

  getSongById: HapiHandler = async (req, h) => {
    const song = await this.getSongByIdUseCase.execute(req.params.id);

    return h.response({
      status: 'success',
      data: { song },
    });
  };

  updateSong: HapiHandler = async (req, h) => {
    const payload = await validateUpdateSong(req.payload);
    const song = await this.updateSongUseCase.execute(req.params.id, payload);

    return h.response({
      status: 'success',
      message: 'Successfuly updated song',
      data: { song },
    });
  };

  deleteSong: HapiHandler = async (req, h) => {
    await this.deleteSongUseCase.execute(req.params.id);

    return h.response({
      status: 'success',
      message: 'Successfuly deleted song',
    });
  };
}
