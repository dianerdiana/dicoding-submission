export interface CollaborationEntity {
  id: string;
  playlistId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export class Collaboration implements CollaborationEntity {
  id: string;
  playlistId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;

  constructor({ id, playlistId, userId }: Omit<CollaborationEntity, 'createdAt' | 'updatedAt'>) {
    this.id = id;
    this.playlistId = playlistId;
    this.userId = userId;

    const timestamp = new Date().toISOString();
    this.createdAt = timestamp;
    this.updatedAt = timestamp;
  }
}
