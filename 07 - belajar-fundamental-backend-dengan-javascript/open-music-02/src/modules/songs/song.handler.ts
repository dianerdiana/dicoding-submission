import { SongService } from './song.service';
import { HapiHandler } from '../../types/hapi';
import { createSongSchema, songSearchParamSchema, updateSongSchema } from './song.schema';
import { validateUUID } from '../../utils/validateUUID';

export class SongHandler {
  private songService: SongService;

  constructor(songService: SongService) {
    this.songService = songService;
  }

  createSong: HapiHandler = async (req) => {
    const payload = await createSongSchema.parseAsync(req.payload);
    const response = await this.songService.createSong(payload);
    return response;
  };

  getAllSongs: HapiHandler = async (req) => {
    const { title, performer } = await songSearchParamSchema.parseAsync(req.query);
    const response = await this.songService.getAllSongs({ title, performer });

    return response;
  };

  getSongById: HapiHandler = async (req) => {
    const { id } = req.params;
    validateUUID(id);

    const response = await this.songService.getSongById(id);
    return response;
  };

  updateSong: HapiHandler = async (req) => {
    const { id } = req.params;
    validateUUID(id);

    const payload = await updateSongSchema.parseAsync(req.payload);
    const response = await this.songService.updateSong(id, payload);
    return response;
  };

  deleteSong: HapiHandler = async (req) => {
    const { id } = req.params;
    validateUUID(id);

    const response = await this.songService.deleteSong(id);
    return response;
  };
}
