import Hapi from '@hapi/hapi';
import { handleError } from './utils/handleError';
import { userPlugin } from './modules/users';
import { authPlugin } from './modules/auth';
import { albumPlugin } from './modules/albums';
import { songPlugin } from './modules/songs';
import { env } from './configs/env';

const init = async () => {
  const server = Hapi.server({
    port: env.app.port,
    host: env.app.host,
  });

  await server.register([userPlugin, authPlugin, songPlugin, albumPlugin]);

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
