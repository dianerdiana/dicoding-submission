import { nanoid } from 'nanoid';

export interface AuthEntity {
  id: string;
  userId: string;
  refreshToken: string;
  createdAt: string;
  updatedAt: string;
}

export class Auth implements AuthEntity {
  id: string;
  userId: string;
  refreshToken: string;
  createdAt: string;
  updatedAt: string;

  constructor({ userId, refreshToken }: Omit<AuthEntity, 'id' | 'createdAt' | 'updatedAt'>) {
    this.id = nanoid(16);
    this.userId = userId;
    this.refreshToken = refreshToken;

    const timestamp = new Date().toISOString();
    this.createdAt = timestamp;
    this.updatedAt = timestamp;
  }

  update({
    userId,
    refreshToken,
  }: Partial<Omit<AuthEntity, 'id' | 'password' | 'createdAt' | 'updatedAt'>>) {
    if (userId !== undefined) this.userId = userId;
    if (refreshToken !== undefined) this.refreshToken = refreshToken;

    this.updatedAt = new Date().toISOString();
  }
}
