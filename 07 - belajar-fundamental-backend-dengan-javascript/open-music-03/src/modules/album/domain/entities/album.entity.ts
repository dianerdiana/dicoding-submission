import { BaseEntity } from '../../../../shared/domains/base-entity';
import { InvalidAlbumNameError, InvalidAlbumYearError } from '../errors/album.errors';
import { AlbumId } from '../value-objects/album-id.vo';

export class Album extends BaseEntity<AlbumId> {
  constructor(
    id: AlbumId,
    private name: string,
    private year: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(id, createdAt, updatedAt);
  }

  static create(name: string, year: number) {
    if (!name || name.trim().length < 2) {
      throw new InvalidAlbumNameError();
    }

    if (Number.isNaN(year) || year < 1900) {
      throw new InvalidAlbumYearError();
    }

    const now = new Date();
    return new Album(new AlbumId(), name, year, now, now);
  }

  getName(): string {
    return this.name;
  }

  getYear(): number {
    return this.year;
  }

  updateName(name: string) {
    if (!name || name.trim().length < 2) {
      throw new InvalidAlbumNameError();
    }

    this.name = name;
    this.updatedAt = new Date();
  }

  updateYear(year: number) {
    if (Number.isNaN(year) || year < 1900) {
      throw new InvalidAlbumYearError();
    }

    this.year = year;
    this.updatedAt = new Date();
  }

  toPrimitives() {
    return {
      id: this.getId().toString(),
      name: this.getName(),
      year: this.getYear(),
      createdAt: this.getCreatedAt(),
      updatedAt: this.getUpdatedAt(),
    };
  }
}
