import { PlaylistService } from './playlist.service';
import { HapiHandler } from '../../types/hapi';
import { successResponse } from '../../utils/response';
import {
  validateSongIdSchema,
  createPlaylistSchema,
  playlistSearchParamSchema,
  updatePlaylistSchema,
} from './playlist.schema';
import { validateUUID } from '../../utils/validateUUID';
import { AuthCredential } from '../../types/AuthCredential';

export class PlaylistHandler {
  private playlistService: PlaylistService;

  constructor(playlistService: PlaylistService) {
    this.playlistService = playlistService;
  }

  createPlaylist: HapiHandler = async (req) => {
    const payload = await createPlaylistSchema.parseAsync(req.payload);
    const { userId: owner } = req.auth.credentials as AuthCredential;
    const response = await this.playlistService.createPlaylist({
      ...payload,
      owner,
    });

    return response;
  };

  getAllPlaylists: HapiHandler = async (req) => {
    const { name } = await playlistSearchParamSchema.parseAsync(req.query);
    const { userId: owner } = req.auth.credentials as AuthCredential;

    const response = await this.playlistService.getAllPlaylists({ name, owner });
    return response;
  };

  getPlaylistById: HapiHandler = async (req) => {
    const { id } = req.params;
    validateUUID(id);

    const response = await this.playlistService.getPlaylistById(id);
    return response;
  };

  updatePlaylist: HapiHandler = async (req) => {
    const { id } = req.params;
    const { userId } = req.auth.credentials as AuthCredential;
    validateUUID(id);

    const payload = await updatePlaylistSchema.parseAsync(req.payload);
    const response = await this.playlistService.updatePlaylist(id, {
      ...payload,
      owner: userId,
    });

    return response;
  };

  deletePlaylist: HapiHandler = async (req) => {
    const { id } = req.params;
    const { userId: owner } = req.auth.credentials as AuthCredential;
    validateUUID(id);

    await this.playlistService.getPlaylistById({ id, owner });
    const response = await this.playlistService.deletePlaylist(id);

    return response;
  };

  addSongToPlaylist: HapiHandler = async (req, res) => {
    const { id } = req.params;
    const { songId } = await validateSongIdSchema.parseAsync(req.payload);
    const { userId: owner } = req.auth.credentials as AuthCredential;
    validateUUID(id);
    validateUUID(songId);
    await this.playlistService.addSongToPlaylist({ id, songId, owner });

    return successResponse({
      res,
      message: 'Successfuly add song to playlist',
      code: 201,
    });
  };

  getPlaylistWithAllSongs: HapiHandler = async (req, res) => {
    const { id } = req.params;
    const { userId: owner } = req.auth.credentials as AuthCredential;
    validateUUID(id);

    const playlistWithAllSongs = await this.playlistService.getPlaylistWithAllSongsById({
      id,
      owner,
    });

    return successResponse({ res, data: { playlist: playlistWithAllSongs } });
  };

  deleteSongFromPlaylistById: HapiHandler = async (req, res) => {
    const { id } = req.params;
    const { userId: owner } = req.auth.credentials as AuthCredential;
    const { songId } = await validateSongIdSchema.parseAsync(req.payload);
    validateUUID(id);

    await this.playlistService.deleteSongFromPlaylistByIdAndSongId({ id, songId, owner });

    return successResponse({
      res,
      message: 'Successfuly deleted playlist song',
      code: 200,
    });
  };
}
