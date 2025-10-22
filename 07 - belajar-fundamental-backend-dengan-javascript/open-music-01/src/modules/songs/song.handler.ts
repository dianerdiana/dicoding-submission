import { ResponseObject } from '@hapi/hapi';
import { SongService } from './song.service';
import { HapiHandler } from '../../types/hapi';
import { successResponse } from '../../utils/response';
import { songIdParamSchema, createSongSchema } from './song.schema';

export class SongHandler {
  private songService: SongService;

  constructor(songService: SongService) {
    this.songService = songService;
  }

  createSong: HapiHandler = async (req, res): Promise<ResponseObject> => {
    const payload = await createSongSchema.parseAsync(req.payload);
    const songId = await this.songService.createSong(payload);

    return successResponse({ res, data: { songId }, code: 201 });
  };

  getAllSongs: HapiHandler = async (req, res): Promise<ResponseObject> => {
    const songs = await this.songService.getAllSongs();
    return successResponse({ res, data: { songs }, code: 200 });
  };

  getSongById: HapiHandler = async (req, res): Promise<ResponseObject> => {
    const { id } = await songIdParamSchema.parseAsync(req.params);
    const song = await this.songService.getSongById(id);

    return successResponse({ res, data: { song }, code: 200 });
  };

  updateSong: HapiHandler = async (req, res): Promise<ResponseObject> => {
    const { id } = await songIdParamSchema.parseAsync(req.params);
    const payload = await createSongSchema.parseAsync(req.payload);
    const updatedSong = await this.songService.updateSong(id, payload);

    return successResponse({
      res,
      message: 'Successfuly updated songs',
      data: { song: updatedSong },
      code: 200,
    });
  };

  deleteSong: HapiHandler = async (req, res): Promise<ResponseObject> => {
    const { id } = await songIdParamSchema.parseAsync(req.params);
    await this.songService.deleteSong(id);

    return successResponse({
      res,
      message: 'Successfuly deleted songs',
      data: { song: {} },
      code: 200,
    });
  };
}
