import { ExportPlaylistSongConsumer } from '@modules/infrastructure/consumers/export-playlist-song.consumer.js';
import { rabbitMQConfig } from './configs/rabbitmq.config.js';
import { ExportPlaylistSongListener } from '@modules/infrastructure/listeners/export-playlist-song.listener.js';
import { GetPlaylistByIdUseCase } from '@modules/application/use-case/get-playlist-by-id.use-case.js';
import { GetAllSongIdsUseCase } from '@modules/application/use-case/get-all-song-ids.use-case.js';
import { GetAllSongByIdsUseCase } from '@modules/application/use-case/get-all-song-by-ids.use-case.js';
import { PlaylistRepository } from '@modules/infrastructure/repositories/playlist.repository.js';
import { PlaylistSongRepository } from '@modules/infrastructure/repositories/playlist-song.repository.js';
import { SongRepository } from '@modules/infrastructure/repositories/song.repository.js';
import { EmailWorker } from './workers/email.worker.js';

const startServer = async () => {
  try {
    const playlistRepository = new PlaylistRepository();
    const playlistSongRepository = new PlaylistSongRepository();
    const songRepository = new SongRepository();

    const getPlaylistByIdUseCase = new GetPlaylistByIdUseCase(playlistRepository);
    const getAllSongIdsUseCase = new GetAllSongIdsUseCase(playlistSongRepository);
    const getAllSongByIdsUseCase = new GetAllSongByIdsUseCase(songRepository);
    const emailWorker = new EmailWorker();

    const exportPlaylistSongListener = new ExportPlaylistSongListener(
      getPlaylistByIdUseCase,
      getAllSongIdsUseCase,
      getAllSongByIdsUseCase,
      emailWorker
    );

    const exportPlaylistSongConsumer = new ExportPlaylistSongConsumer(exportPlaylistSongListener);

    await rabbitMQConfig.connect();
    await exportPlaylistSongConsumer.consume();
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('unhandledRejection', err => {
  console.error(err);
  process.exit(1);
});

startServer();
