import { Message } from 'amqplib';
import { QUEUES } from '../../shared/constants/queues';
import { rabbitMQConfig } from '../configs/rabbitmq.config';

export class SendPlaylistSongEmailConsumer {
  async execute() {
    try {
      await rabbitMQConfig.connect();

      const channel = rabbitMQConfig.getConsumerChannel();
      await channel.assertQueue(QUEUES.exportPlaylistSong, { durable: true });

      channel.prefetch(1);
      console.log(`[Consumer] Waiting for messages in ${QUEUES.exportPlaylistSong}.`);

      channel.consume(
        QUEUES.exportPlaylistSong,
        (msg: Message | null) => {
          if (msg) {
            const content = msg.content.toJSON();
            console.log(`[Consumer] Received message: '${content}'`);

            setTimeout(() => {
              channel.ack(msg);
              console.log(`[Consumer] Message ACKed: '${content}'`);
            }, 1000);
          }
        },
        {
          noAck: false,
        },
      );
    } catch (error) {
      console.error('[Consumer] Error starting consumer:', error);
    }
  }
}
