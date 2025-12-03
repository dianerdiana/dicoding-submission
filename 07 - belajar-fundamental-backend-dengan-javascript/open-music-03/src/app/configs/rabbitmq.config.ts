import amqp from 'amqplib';
import { env } from './env.config';

export const createChannel = async () => {
  const connection = await amqp.connect(env.rabbitmq.server);
  const channel = await connection.createChannel();

  return channel;
};
