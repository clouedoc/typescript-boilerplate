import { Channel, connect, Connection } from 'amqplib';
import { env } from '../utils';

const connection: Connection | undefined = undefined;

/**
 * Connect to RabbitMQ and create a channel.
 * @returns a RabbitMQ channel
 */
export async function rabbit(): Promise<Channel> {
  const conn: Connection = connection ?? (await connect(env.AMQP_URL));
  return conn.createChannel();
}
