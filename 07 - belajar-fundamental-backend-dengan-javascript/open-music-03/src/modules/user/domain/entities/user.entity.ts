import { BaseEntity } from '../../../../shared/domains/entities/base.entity';
import { InvalidRequiredError } from '../../../../shared/domains/errors/invalid-required.error';
import { UserId } from '../value-objects/user-id.vo';

export interface UserProps {
  id: UserId;
  fullname: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User extends BaseEntity<UserId> {
  private fullname: string;
  private username: string;
  private password: string;

  constructor(props: UserProps) {
    const { id, fullname, username, password, createdAt, updatedAt } = props;

    super(id, createdAt, updatedAt);
    this.fullname = fullname;
    this.username = username;
    this.password = password;
  }

  static create({
    fullname,
    username,
    password,
  }: Omit<UserProps, 'id' | 'createdAt' | 'updatedAt'>) {
    if (!fullname || fullname.trim().length === 0) {
      throw new InvalidRequiredError('Fullname');
    }

    if (!username || username.trim().length === 0) {
      throw new InvalidRequiredError('Username');
    }

    if (!password || password.trim().length === 0) {
      throw new InvalidRequiredError('Password');
    }

    const now = new Date();
    return new User({
      id: new UserId(),
      fullname,
      username,
      password,
      createdAt: now,
      updatedAt: now,
    });
  }

  getFullname(): string {
    return this.fullname;
  }

  getUsername(): string {
    return this.username;
  }

  updateFullname(fullname: string) {
    if (!fullname || fullname.trim().length === 0) {
      throw new InvalidRequiredError('Fullname');
    }

    this.fullname = fullname;
    this.updatedAt = new Date();
  }

  updateUsernmae(username: string) {
    if (!username || username.trim().length === 0) {
      throw new InvalidRequiredError('Fullname');
    }

    this.username = username;
    this.updatedAt = new Date();
  }

  toPrimitives() {
    return {
      id: this.getId().toString(),
      fullname: this.getFullname(),
      username: this.getUsername(),
      createdAt: this.getCreatedAt(),
      updatedAt: this.getUpdatedAt(),
    };
  }
}
