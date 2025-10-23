import { Pool } from 'pg';
import { env } from '../configs/env';
import { camelizeKeys, decamelizeKeys } from './mapper';

export const pool = new Pool({
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.database,
});

export const query = async <T = any>(
  text: string,
  params?: any[],
  options?: { raw?: boolean },
): Promise<T[]> => {
  const res = await pool.query(text, params);
  return options?.raw ? (res.rows as T[]) : res.rows.map((r) => camelizeKeys<T>(r));
};

export const insert = async <T = any>(table: string, data: Record<string, any>): Promise<T> => {
  const snake = decamelizeKeys(data);
  const keys = Object.keys(snake);
  const values = Object.values(snake);
  const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');

  const q = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`;
  const res = await pool.query(q, values);
  return camelizeKeys<T>(res.rows[0]);
};
