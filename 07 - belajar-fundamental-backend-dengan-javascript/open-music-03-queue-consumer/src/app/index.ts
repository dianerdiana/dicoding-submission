import { sendPlaylistSongEmailConsumer } from '@consumers/send-playlist-song-email.use-case.js';
import { rabbitMQConfig } from './configs/rabbitmq.config.js';

const startServer = async () => {
  try {
    await rabbitMQConfig.connect();
    await sendPlaylistSongEmailConsumer.execute();
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
