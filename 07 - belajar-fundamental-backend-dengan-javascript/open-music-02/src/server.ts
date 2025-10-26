import Hapi from '@hapi/hapi';
import { handleError } from './utils/handleError';
import { playlistSongPlugin } from './modules/playlist-songs';
import { collaborationPlugin } from './modules/collaborations';
import { userPlugin } from './modules/users';
import { authPlugin } from './modules/auth';
import { songPlugin } from './modules/songs';
import { albumPlugin } from './modules/albums';
import { playlistPlugin } from './modules/playlists';
import { playlistSongActivityPlugin } from './modules/playlist-song-activities';
import { env } from './configs/env';
import Jwt from '@hapi/jwt';

const init = async () => {
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
        authId: artifacts.decoded.payload.authId,
      },
    }),
  });

  await server.register([
    playlistSongPlugin,
    userPlugin,
    authPlugin,
    songPlugin,
    albumPlugin,
    playlistPlugin,
    playlistSongActivityPlugin,
    collaborationPlugin,
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
        return h.response({ status: 'error', message: 'Missing HTTP code' }).code(500);
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

  await server.start();
  console.log(`🚀 Server running at: ${server.info.uri}`);
};

init();
