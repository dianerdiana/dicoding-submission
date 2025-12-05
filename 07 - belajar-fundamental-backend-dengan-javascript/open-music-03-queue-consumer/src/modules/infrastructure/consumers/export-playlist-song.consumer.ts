import { QUEUES } from '@shared/constants/queues.constant.js';
import { rabbitMQConfig } from '@app/configs/rabbitmq.config.js';
import { ExportPlaylistSongListener } from '../listeners/export-playlist-song.listener.js';

export class ExportPlaylistSongConsumer {
  constructor(private readonly exportPlaylistSongListener: ExportPlaylistSongListener) {}

  async consume() {
    try {
      await rabbitMQConfig.connect();

      const channel = rabbitMQConfig.getConsumerChannel();
      await channel.assertQueue(QUEUES.exportPlaylistSong, { durable: true });

      channel.prefetch(1);
      console.log(`[Consumer] Waiting for messages in ${QUEUES.exportPlaylistSong}.`);

      channel.consume(
        QUEUES.exportPlaylistSong,
        message => this.exportPlaylistSongListener.listen(message, channel),
        {
          noAck: false,
        }
      );
    } catch (error) {
      console.error('[Consumer] Error starting consumer:', error);
    }
  }
}
