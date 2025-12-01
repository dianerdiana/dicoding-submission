import { BaseEntity } from '../../../../shared/domains/entities/base.entity';
import { InvalidRequiredError } from '../../../../shared/domains/errors/invalid-required.error';
import { CollaborationId } from '../value-objects/collaboration-id.vo';

export interface CollaborationProps {
  id: CollaborationId;
  playlistId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Collaboration extends BaseEntity<CollaborationId> {
  private playlistId: string;
  private userId: string;

  constructor(props: CollaborationProps) {
    const { id, playlistId, userId, createdAt, updatedAt } = props;

    super(id, createdAt, updatedAt);
    this.playlistId = playlistId;
    this.userId = userId;
  }

  static create({
    playlistId,
    userId,
  }: Omit<CollaborationProps, 'id' | 'createdAt' | 'updatedAt'>) {
    if (!userId || userId.trim().length === 0) {
      throw new InvalidRequiredError('User ID');
    }

    const now = new Date();
    return new Collaboration({
      id: new CollaborationId(),
      playlistId,
      userId,
      createdAt: now,
      updatedAt: now,
    });
  }

  getPlaylistId(): string {
    return this.playlistId;
  }

  getUserId(): string {
    return this.userId;
  }

  updatePlaylistId(playlistId: string) {
    if (!playlistId || playlistId.trim().length === 0) {
      throw new InvalidRequiredError('Playlist ID');
    }

    this.playlistId = playlistId;
    this.updatedAt = new Date();
  }

  updateUserId(userId: string) {
    if (!userId || userId.trim().length === 0) {
      throw new InvalidRequiredError('User ID');
    }

    this.userId = userId;
    this.updatedAt = new Date();
  }

  toPrimitives() {
    return {
      id: this.getId().toString(),
      playlistId: this.getPlaylistId(),
      userId: this.getUserId(),
      createdAt: this.getCreatedAt().toISOString(),
      updatedAt: this.getUpdatedAt().toISOString(),
    };
  }
}
