export interface PlaylistEntity {
  id: string;
  name: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export class Playlist implements PlaylistEntity {
  id: string;
  name: string;
  owner: string;
  createdAt: string;
  updatedAt: string;

  constructor({ id, name, owner }: Omit<PlaylistEntity, 'createdAt' | 'updatedAt'>) {
    this.id = id;
    this.name = name;
    this.owner = owner;

    const timestamp = new Date().toISOString();
    this.createdAt = timestamp;
    this.updatedAt = timestamp;
  }

  update({ name, owner }: Partial<Omit<PlaylistEntity, 'id' | 'createdAt' | 'updatedAt'>>) {
    if (name !== undefined) this.name = name;
    if (owner !== undefined) this.owner = owner;

    this.updatedAt = new Date().toISOString();
  }
}
