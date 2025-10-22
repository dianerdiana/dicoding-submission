import 'dotenv/config';

export const env = {
  app: {
    port: Number(process.env.APP_PORT) || 4000,
    host: process.env.APP_HOST || 'localhost',
  },
  db: {
    host: process.env.PGHOST || 'localhost',
    port: Number(process.env.PGPORT) || 5432,
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'postgres',
    database: process.env.PGDATABASE || 'dcd_open_music',
  },
};
