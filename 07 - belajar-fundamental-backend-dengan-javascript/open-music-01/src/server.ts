import Hapi from '@hapi/hapi';
import { handleError } from './utils/handleError';
import { albumPlugin } from './modules/albums';
import { songPlugin } from './modules/songs';

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
  });

  await server.register([albumPlugin, songPlugin]);

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
