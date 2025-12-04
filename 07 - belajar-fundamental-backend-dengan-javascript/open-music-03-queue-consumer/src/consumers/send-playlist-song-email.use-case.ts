import type { Message } from 'amqplib';
import { QUEUES } from '@shared/constants/queues.constant.js';
import { rabbitMQConfig } from '@app/configs/rabbitmq.config.js';
import { emailWorker } from '@app/workers/email.worker.js';

class SendPlaylistSongEmailConsumer {
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
            const messageBuffer = msg.content.toString();
            const message = JSON.parse(messageBuffer);

            const targetEmail = message.targetEmail;
            const content = JSON.stringify(message.content);

            emailWorker.sendMail(targetEmail, content);

            setTimeout(() => {
              channel.ack(msg);
            }, 1000);
          }
        },
        {
          noAck: false,
        }
      );
    } catch (error) {
      console.error('[Consumer] Error starting consumer:', error);
    }
  }
}

export const sendPlaylistSongEmailConsumer = new SendPlaylistSongEmailConsumer();
