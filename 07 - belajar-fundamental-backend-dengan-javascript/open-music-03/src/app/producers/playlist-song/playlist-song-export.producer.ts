import { QUEUES } from '../../../shared/constants/queues';
import { rabbitMQConfig } from '../../configs/rabbitmq.config';

type Song = {
  id: string;
  title: string;
  performer: string;
};

type PlaylistCreatedDto = {
  id: string;
  name: string;
  songs: Song[];
};

export class PlaylistSongExportProducer {
  async execute(payload: PlaylistCreatedDto, targetEmail: string) {
    try {
      const channel = rabbitMQConfig.getProducerChannel();
      await channel.assertQueue(QUEUES.exportPlaylistSong, { durable: true });

      const message = Buffer.from(JSON.stringify(payload));
      const success = channel.sendToQueue(QUEUES.exportPlaylistSong, message, {
        persistent: true,
      });

      if (success) {
        console.log(`[Producer] Message sent to ${QUEUES.exportPlaylistSong}: '${message}'`);
      } else {
        console.warn(`[Producer] Warning: Message not sent immediately (channel full).`);
      }
    } catch (error) {
      console.error('[Producer] Error sending message:', error);
    }
  }
}
