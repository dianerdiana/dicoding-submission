import { env } from '../../../../app/configs/env.config';
import { BaseEntity } from '../../../../shared/domains/entities/base.entity';
import { InvalidMinError } from '../../../../shared/domains/errors/invalid-min.error';
import { InvalidNumberError } from '../../../../shared/domains/errors/invalid-number.error';
import { AlbumId } from '../value-objects/album-id.vo';

const BASE_URL = env.app.baseUrl;
export interface AlbumProps {
  id: AlbumId;
  name: string;
  year: number;
  cover?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Album extends BaseEntity<AlbumId> {
  private name: string;
  private year: number;
  private cover?: string;

  constructor(props: AlbumProps) {
    const { id, name, year, cover, createdAt, updatedAt } = props;
    super(id, createdAt, updatedAt);

    this.name = name;
    this.year = year;
    this.cover = cover;
  }

  static create(name: string, year: number) {
    if (!name || name.trim().length < 2) {
      throw new InvalidMinError('Name', 2);
    }

    if (Number.isNaN(year) || year < 1900) {
      throw new InvalidNumberError('Year');
    }

    const now = new Date();
    return new Album({
      id: new AlbumId(),
      name,
      year,
      createdAt: now,
      updatedAt: now,
    });
  }

  getName(): string {
    return this.name;
  }

  getYear(): number {
    return this.year;
  }

  getCover(): string | null {
    return this.cover ? this.cover : null;
  }

  getCoverUrl(): string | null {
    return this.cover ? `${BASE_URL}/${this.cover}` : null;
  }

  updateName(name: string) {
    if (!name || name.trim().length < 2) {
      throw new InvalidMinError('Name', 2);
    }

    this.name = name;
    this.updatedAt = new Date();
  }

  updateCoverUrl(cover: string) {
    if (!cover || cover.trim().length < 2) {
      throw new InvalidMinError('Cover URL', 2);
    }

    this.cover = cover;
    this.updatedAt = new Date();
  }

  updateYear(year: number) {
    if (Number.isNaN(year) || year < 1900) {
      throw new InvalidNumberError('Year');
    }

    this.year = year;
    this.updatedAt = new Date();
  }

  toPrimitives() {
    return {
      id: this.getId().toString(),
      name: this.getName(),
      year: this.getYear(),
      cover: this.getCover(),
      coverUrl: this.getCoverUrl(),
      createdAt: this.getCreatedAt().toISOString(),
      updatedAt: this.getUpdatedAt().toISOString(),
    };
  }
}
