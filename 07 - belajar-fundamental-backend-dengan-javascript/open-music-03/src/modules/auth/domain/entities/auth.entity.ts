import { BaseEntity } from '../../../../shared/domains/entities/base.entity';
import { InvalidRequiredError } from '../../../../shared/domains/errors/invalid-required.error';
import { AuthId } from '../value-objects/auth-id.vo';

export interface AuthProps {
  id: AuthId;
  userId: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Auth extends BaseEntity<AuthId> {
  private userId: string;
  private refreshToken: string;

  constructor(props: AuthProps) {
    const { id, userId, refreshToken, createdAt, updatedAt } = props;

    super(id, createdAt, updatedAt);
    this.userId = userId;
    this.refreshToken = refreshToken;
  }

  static create({ userId, refreshToken }: Omit<AuthProps, 'id' | 'createdAt' | 'updatedAt'>) {
    if (!userId || userId.trim().length === 0) {
      throw new InvalidRequiredError('User ID');
    }

    if (!refreshToken || refreshToken.trim().length === 0) {
      throw new InvalidRequiredError('Refresh Token');
    }

    const now = new Date();
    return new Auth({
      id: new AuthId(),
      userId,
      refreshToken,
      createdAt: now,
      updatedAt: now,
    });
  }

  getUserId(): string {
    return this.userId;
  }

  getRefreshToken(): string {
    return this.refreshToken;
  }

  updateUserId(userId: string) {
    if (!userId || userId.trim().length === 0) {
      throw new InvalidRequiredError('UserId');
    }

    this.userId = userId;
    this.updatedAt = new Date();
  }

  updateRefreshToken(refreshToken: string) {
    if (!refreshToken || refreshToken.trim().length === 0) {
      throw new InvalidRequiredError('Refresh Token');
    }

    this.refreshToken = refreshToken;
    this.updatedAt = new Date();
  }

  toPrimitives() {
    return {
      id: this.getId().toString(),
      userId: this.getUserId(),
      refreshToken: this.getRefreshToken(),
      createdAt: this.getCreatedAt().toISOString(),
      updatedAt: this.getUpdatedAt().toISOString(),
    };
  }
}
