import { BaseEntity } from '../../../../shared/domains/entities/base.entity';
import { InvalidRequiredError } from '../../../../shared/domains/errors/invalid-required.error';
import { PlaylistId } from '../value-objects/playlist-id.vo';

export interface PlaylistProps {
  id: PlaylistId;
  name: string;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Playlist extends BaseEntity<PlaylistId> {
  private name: string;
  private owner: string;

  constructor(props: PlaylistProps) {
    const { id, name, owner, createdAt, updatedAt } = props;

    super(id, createdAt, updatedAt);
    this.name = name;
    this.owner = owner;
  }

  static create({ name, owner }: Omit<PlaylistProps, 'id' | 'createdAt' | 'updatedAt'>) {
    if (!name || name.trim().length === 0) {
      throw new InvalidRequiredError('Name');
    }

    if (!owner || owner.trim().length === 0) {
      throw new InvalidRequiredError('Owner');
    }

    const now = new Date();
    return new Playlist({
      id: new PlaylistId(),
      name,
      owner,
      createdAt: now,
      updatedAt: now,
    });
  }

  getName(): string {
    return this.name;
  }

  getOwner(): string {
    return this.owner;
  }

  updateName(name: string) {
    if (!name || name.trim().length === 0) {
      throw new InvalidRequiredError('Name');
    }

    this.name = name;
    this.updatedAt = new Date();
  }

  updateOwner(owner: string) {
    if (!owner || owner.trim().length === 0) {
      throw new InvalidRequiredError('Owner');
    }

    this.owner = owner;
    this.updatedAt = new Date();
  }

  toPrimitives() {
    return {
      id: this.getId().toString(),
      name: this.getName(),
      owner: this.getOwner(),
      createdAt: this.getCreatedAt().toISOString(),
      updatedAt: this.getUpdatedAt().toISOString(),
    };
  }
}
