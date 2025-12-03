import { createChannel } from '../../configs/rabbitmq.config';

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

const EXCHANGE = 'playlist-song:export:producer';
const QUEUE = 'playlist-song:export';

export class PlaylistSongExportProducer {
  async execute(payload: PlaylistCreatedDto) {
    const channel = await createChannel();
    await channel.assertExchange(EXCHANGE, 'topic', { durable: true });

    channel.publish(EXCHANGE, QUEUE, Buffer.from(JSON.stringify(payload)), { persistent: true });
  }
}
