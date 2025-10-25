import Hapi from '@hapi/hapi';
import { handleError } from './utils/handleError';
import { playlistSongPlugin } from './modules/playlist-songs';
import { userPlugin } from './modules/users';
import { authPlugin } from './modules/auth';
import { songPlugin } from './modules/songs';
import { albumPlugin } from './modules/albums';
import { playlistPlugin } from './modules/playlists';
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
        userId: artifacts.decoded.payload.userId,
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
  ]);

  server.ext('onPreResponse', (req, h) => {
    const { response } = req;

    if (response instanceof Error) {
      // 💡 cukup panggil sekali, semua jenis error akan diformat dengan konsisten
      return handleError({ res: h, error: response });
    }

    return h.continue;
  });

  await server.start();
  console.log(`🚀 Server running at: ${server.info.uri}`);
};

init();
