import { BaseEntity } from '../../../../shared/domains/entities/base.entity';
import { InvalidRequiredError } from '../../../../shared/domains/errors/invalid-required.error';
import { AlbumLikeId } from '../value-objects/album-like-id.vo';

export interface AlbumLikeProps {
  id: AlbumLikeId;
  albumId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class AlbumLike extends BaseEntity<AlbumLikeId> {
  private albumId: string;
  private userId: string;

  constructor(props: AlbumLikeProps) {
    const { id, albumId, userId, createdAt, updatedAt } = props;

    super(id, createdAt, updatedAt);
    this.albumId = albumId;
    this.userId = userId;
  }

  static create({ albumId, userId }: Omit<AlbumLikeProps, 'id' | 'createdAt' | 'updatedAt'>) {
    if (!userId || userId.trim().length === 0) {
      throw new InvalidRequiredError('User ID');
    }

    const now = new Date();
    return new AlbumLike({
      id: new AlbumLikeId(),
      albumId,
      userId,
      createdAt: now,
      updatedAt: now,
    });
  }

  getAlbumId(): string {
    return this.albumId;
  }

  getUserId(): string {
    return this.userId;
  }

  updateAlbumId(albumId: string) {
    if (!albumId || albumId.trim().length === 0) {
      throw new InvalidRequiredError('Playlist ID');
    }

    this.albumId = albumId;
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
      albumId: this.getAlbumId(),
      userId: this.getUserId(),
      createdAt: this.getCreatedAt().toISOString(),
      updatedAt: this.getUpdatedAt().toISOString(),
    };
  }
}
