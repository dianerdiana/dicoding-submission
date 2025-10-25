import { ResponseObject } from '@hapi/hapi';
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

  createPlaylist: HapiHandler = async (req, res): Promise<ResponseObject> => {
    const payload = await createPlaylistSchema.parseAsync(req.payload);
    const { userId: owner } = req.auth.credentials as AuthCredential;
    const playlistId = await this.playlistService.createPlaylist({
      ...payload,
      owner,
    });

    return successResponse({ res, data: { playlistId }, code: 201 });
  };

  getAllPlaylists: HapiHandler = async (req, res): Promise<ResponseObject> => {
    const { name } = await playlistSearchParamSchema.parseAsync(req.query);
    const { userId: owner } = req.auth.credentials as AuthCredential;
    const playlists = await this.playlistService.getAllPlaylists({ name, owner });

    return successResponse({ res, data: { playlists }, code: 200 });
  };

  getPlaylistById: HapiHandler = async (req, res): Promise<ResponseObject> => {
    const { id } = req.params;
    validateUUID(id);

    const playlist = await this.playlistService.getPlaylistById(id);

    return successResponse({ res, data: { playlist }, code: 200 });
  };

  updatePlaylist: HapiHandler = async (req, res): Promise<ResponseObject> => {
    const { id } = req.params;
    const { userId } = req.auth.credentials as AuthCredential;
    validateUUID(id);

    const payload = await updatePlaylistSchema.parseAsync(req.payload);
    const updatedPlaylist = await this.playlistService.updatePlaylist(id, {
      ...payload,
      owner: userId,
    });

    return successResponse({
      res,
      message: 'Successfuly updated playlists',
      data: { playlist: updatedPlaylist },
      code: 200,
    });
  };

  deletePlaylist: HapiHandler = async (req, res): Promise<ResponseObject> => {
    const { id } = req.params;
    const { userId: owner } = req.auth.credentials as AuthCredential;
    validateUUID(id);

    await this.playlistService.getPlaylistById({ id, owner });
    await this.playlistService.deletePlaylist(id);

    return successResponse({
      res,
      message: 'Successfuly deleted playlists',
      code: 200,
    });
  };

  addSongToPlaylist: HapiHandler = async (req, res): Promise<ResponseObject> => {
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

  getPlaylistWithAllSongs: HapiHandler = async (req, res): Promise<ResponseObject> => {
    const { id } = req.params;
    const { userId: owner } = req.auth.credentials as AuthCredential;
    validateUUID(id);

    const playlistWithAllSongs = await this.playlistService.getPlaylistWithAllSongsById({
      id,
      owner,
    });

    return successResponse({ res, data: { playlist: playlistWithAllSongs } });
  };

  deleteSongFromPlaylistById: HapiHandler = async (req, res): Promise<ResponseObject> => {
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
