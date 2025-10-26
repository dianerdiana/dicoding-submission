import { PlaylistService } from './playlist.service';
import { HapiHandler } from '../../types/hapi';
import {
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
    const { authId } = req.auth.credentials as AuthCredential;
    const response = await this.playlistService.createPlaylist({
      ...payload,
      authId,
    });

    return response;
  };

  getAllPlaylists: HapiHandler = async (req) => {
    const { name } = await playlistSearchParamSchema.parseAsync(req.query);
    const { authId } = req.auth.credentials as AuthCredential;

    const response = await this.playlistService.getAllPlaylists({ name, authId });
    return response;
  };

  getPlaylistById: HapiHandler = async (req) => {
    const { id } = req.params;
    validateUUID(id);

    const response = await this.playlistService.getPlaylistById(id);
    return response;
  };

  getOwnPlaylistById: HapiHandler = async (req) => {
    const { id: playlistId } = req.params;
    const { authId } = req.auth.credentials as AuthCredential;
    validateUUID(playlistId);

    const response = await this.playlistService.getOwnPlaylistById({ playlistId, authId });
    return response;
  };

  updatePlaylist: HapiHandler = async (req) => {
    const { id } = req.params;
    const { authId } = req.auth.credentials as AuthCredential;
    validateUUID(id);

    const payload = await updatePlaylistSchema.parseAsync(req.payload);
    const response = await this.playlistService.updatePlaylist(id, {
      ...payload,
      authId,
    });

    return response;
  };

  deletePlaylist: HapiHandler = async (req) => {
    const { id } = req.params;
    const { authId } = req.auth.credentials as AuthCredential;
    validateUUID(id);

    await this.playlistService.getOwnPlaylistById({ playlistId: id, authId });
    const response = await this.playlistService.deletePlaylist(id);

    return response;
  };
}
