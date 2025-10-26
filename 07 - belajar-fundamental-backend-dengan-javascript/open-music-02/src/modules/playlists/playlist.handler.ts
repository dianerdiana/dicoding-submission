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
    const { userId } = req.auth.credentials as AuthCredential;
    const response = await this.playlistService.createPlaylist({
      ...payload,
      userId,
    });

    return response;
  };

  getAllPlaylists: HapiHandler = async (req) => {
    const { name } = await playlistSearchParamSchema.parseAsync(req.query);
    const { userId } = req.auth.credentials as AuthCredential;

    const response = await this.playlistService.getAllPlaylists({ name, userId });
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
    const { userId } = req.auth.credentials as AuthCredential;
    validateUUID(playlistId);

    const response = await this.playlistService.getOwnPlaylistById({ playlistId, userId });
    return response;
  };

  updatePlaylist: HapiHandler = async (req) => {
    const { id } = req.params;
    const { userId } = req.auth.credentials as AuthCredential;
    validateUUID(id);

    const payload = await updatePlaylistSchema.parseAsync(req.payload);
    const response = await this.playlistService.updatePlaylist(id, {
      ...payload,
      userId,
    });

    return response;
  };

  deletePlaylist: HapiHandler = async (req) => {
    const { id } = req.params;
    const { userId } = req.auth.credentials as AuthCredential;
    validateUUID(id);

    await this.playlistService.getOwnPlaylistById({ playlistId: id, userId });
    const response = await this.playlistService.deletePlaylist(id);

    return response;
  };
}
