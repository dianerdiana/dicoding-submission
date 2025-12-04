import 'dotenv/config';

export const env = {
  rabbitmq: {
    server: process.env.RABBITMQ_SERVER || 'http://localhost:15672',
  },
  mail: {
    user: process.env.SMTP_USER || 'user@example.com',
    password: process.env.SMTP_PASSWORD || '',
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT) || 587,
  },
};
