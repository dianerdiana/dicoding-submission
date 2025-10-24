import { nanoid } from 'nanoid';

export interface UserEntity {
  id: string;
  fullname: string;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export class User implements UserEntity {
  id: string;
  fullname: string;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;

  constructor({
    fullname,
    username,
    password,
  }: Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>) {
    this.id = nanoid(16);
    this.fullname = fullname;
    this.username = username;
    this.password = password;

    const timestamp = new Date().toISOString();
    this.createdAt = timestamp;
    this.updatedAt = timestamp;
  }

  update({
    fullname,
    username,
  }: Partial<Omit<UserEntity, 'id' | 'password' | 'createdAt' | 'updatedAt'>>) {
    if (fullname !== undefined) this.fullname = fullname;
    if (username !== undefined) this.username = username;

    this.updatedAt = new Date().toISOString();
  }
}
