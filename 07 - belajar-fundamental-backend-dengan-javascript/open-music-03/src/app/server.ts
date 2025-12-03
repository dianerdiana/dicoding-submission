import Hapi from '@hapi/hapi';
import Jwt from '@hapi/jwt';
import { env } from './configs/env.config';
import { handleError } from './handlers/handle-error';
import { albumPlugin } from '../modules/album/infrastructure/album.plugin';
import { songPlugin } from '../modules/song/infrastructure/song.plugin';
import { authPlugin } from '../modules/auth/infrasctructure/auth.plugin';
import { userPlugin } from '../modules/user/infrastructure/user.plugin';
import { playlistPlugin } from '../modules/playlist/infrastructure/playlist.plugin';
import { playlistSongPlugin } from '../modules/playlist-song/insfrastructure/playlist-song.plugin';
import { STATUS_RESPONSE } from '../shared/constants/status-responses.constant';
import { collaborationPlugin } from '../modules/collaboration/infrasctructure/collaboration.plugin';
import { playlistSongActivityPlugin } from '../modules/playlist-song-activity/infrasctructure/playlist-song-activity.plugin';
import { exportPlugin } from '../modules/export/infrastructure/export.plugin';

export const createServer = async () => {
  const server = Hapi.server({
    port: env.app.port,
    host: env.app.host,
  });

  await server.register([Jwt]);
  server.auth.strategy('auth_jwt', 'jwt', {
    keys: env.token.accessTokenKey,
    verify: {
      aud: false,
      iss: false,
      sub: false,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        userId: artifacts.decoded.payload.userId,
        username: artifacts.decoded.payload.username,
      },
    }),
  });

  await server.register([
    albumPlugin,
    songPlugin,
    authPlugin,
    userPlugin,
    playlistPlugin,
    playlistSongPlugin,
    collaborationPlugin,
    playlistSongActivityPlugin,
    exportPlugin,
  ]);

  server.ext('onPreResponse', (req, h) => {
    const { response } = req;

    // 1. Tangani Error
    if (response instanceof Error) {
      // Logika untuk AppError, ZodError, dll. di dalam handleError()
      return handleError({ res: h, error: response });
    }

    // --- Perubahan Logika Success Response ---

    // 2. Ambil source. Harus di-cast ke 'any' atau 'object' karena tipe Hapi yang ketat.
    const responsePayload = response.source as any;

    // 3. Cek apakah responsePayload valid dan memiliki marker kustom
    if (responsePayload && typeof responsePayload === 'object' && responsePayload._isApiResponse) {
      // Cek pengaman tambahan untuk data yang dibutuhkan
      if (typeof responsePayload.code !== 'number') {
        // Ini terjadi jika Service mengembalikan ApiResponse tapi code-nya hilang
        return h
          .response({ status: STATUS_RESPONSE.error, message: 'Missing HTTP code' })
          .code(500);
      }

      const successPayload = {
        status: responsePayload.status || 'success', // Fallback status
        message: responsePayload.message,
        data: responsePayload.data,
      };

      // Lakukan pembentukan response HTTP final
      return h.response(successPayload).code(responsePayload.code);
    }

    // 4. Lanjutkan (jika response adalah ResponseObject Hapi standar, atau data mentah yang tidak ditandai)
    return h.continue;
  });

  return server;
};
