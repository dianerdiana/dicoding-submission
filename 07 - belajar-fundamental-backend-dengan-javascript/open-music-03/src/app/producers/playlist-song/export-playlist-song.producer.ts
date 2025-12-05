import { QUEUES } from '../../../shared/constants/queues.constant';
import { rabbitMQConfig } from '../../configs/rabbitmq.config';

export class ExportPlaylistSongProducer {
  async execute(payload: { targetEmail: string; playlistId: string }) {
    try {
      const channel = rabbitMQConfig.getProducerChannel();
      await channel.assertQueue(QUEUES.exportPlaylistSong, { durable: true });

      const message = Buffer.from(
        JSON.stringify({
          targetEmail: payload.targetEmail,
          playlistId: payload.playlistId,
        }),
      );
      const success = channel.sendToQueue(QUEUES.exportPlaylistSong, message, {
        persistent: true,
      });

      if (success) {
        console.log(`[Producer] Message sent to ${QUEUES.exportPlaylistSong}`);
      } else {
        console.warn(`[Producer] Warning: Message not sent immediately (channel full).`);
      }
    } catch (error) {
      console.error('[Producer] Error sending message:', error);
    }
  }
}
