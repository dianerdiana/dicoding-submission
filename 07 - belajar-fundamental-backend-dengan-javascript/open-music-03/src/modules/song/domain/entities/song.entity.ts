import { BaseEntity } from '../../../../shared/domains/entities/base.entity';
import { InvalidMinError } from '../../../../shared/domains/errors/invalid-min.error';
import { InvalidNumberError } from '../../../../shared/domains/errors/invalid-number.error';
import { InvalidRequiredError } from '../../../../shared/domains/errors/invalid-required.error';
import { SongId } from '../value-objects/song-id.vo';

export interface SongProps {
  id: SongId;
  title: string;
  year: number;
  genre: string;
  performer: string;
  duration?: number;
  albumId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Song extends BaseEntity<SongId> {
  private title: string;
  private year: number;
  private genre: string;
  private performer: string;
  private duration?: number;
  private albumId?: string;

  constructor(props: SongProps) {
    const { id, title, year, genre, performer, duration, albumId, createdAt, updatedAt } = props;

    super(id, createdAt, updatedAt);
    this.title = title;
    this.year = year;
    this.genre = genre;
    this.performer = performer;
    this.duration = duration;
    this.albumId = albumId;
  }

  static create({
    title,
    year,
    genre,
    performer,
    duration,
    albumId,
  }: {
    title: string;
    year: number;
    genre: string;
    performer: string;
    duration?: number;
    albumId?: string;
  }) {
    if (!title || title.trim().length < 2) {
      throw new InvalidMinError('Title', 2);
    }

    if (!genre || genre.trim().length === 0) {
      throw new InvalidRequiredError('Genre');
    }

    if (!performer || performer.trim().length === 0) {
      throw new InvalidRequiredError('Performer');
    }

    if (Number.isNaN(year) || year < 1900) {
      throw new InvalidNumberError('Year');
    }

    if (duration && Number.isNaN(duration)) {
      throw new InvalidNumberError('Duration');
    }

    if (albumId && albumId.trim().length === 0) {
      throw new InvalidMinError('AlbumID', 1);
    }

    const now = new Date();
    return new Song({
      id: new SongId(),
      title,
      year,
      genre,
      performer,
      createdAt: now,
      updatedAt: now,
      duration,
    });
  }

  getTitle(): string {
    return this.title;
  }

  getYear(): number {
    return this.year;
  }

  getGenre(): string {
    return this.genre;
  }

  getPerformer(): string {
    return this.performer;
  }

  getDuration(): number | undefined {
    return this.duration;
  }

  getAlbumId(): string | undefined {
    return this.albumId;
  }

  updateTitle(title: string) {
    if (!title || title.trim().length < 2) {
      throw new InvalidMinError('Title', 2);
    }

    this.title = title;
    this.updatedAt = new Date();
  }

  updateYear(year: number) {
    if (Number.isNaN(year) || year < 1900) {
      throw new InvalidNumberError('Year');
    }

    this.year = year;
    this.updatedAt = new Date();
  }

  updateGenre(genre: string) {
    if (!genre || genre.trim().length === 0) {
      throw new InvalidRequiredError('Genre');
    }

    this.genre = genre;
    this.updatedAt = new Date();
  }

  updatePerformer(performer: string) {
    if (!performer || performer.trim().length === 0) {
      throw new InvalidRequiredError('Performer');
    }

    this.performer = performer;
    this.updatedAt = new Date();
  }

  updateDuration(duration: number | undefined) {
    if (duration && Number.isNaN(duration)) {
      throw new InvalidNumberError('Duration');
    }

    this.duration = duration;
    this.updatedAt = new Date();
  }

  updateAlbumId(albumId: string | undefined) {
    if (albumId && albumId.trim().length === 0) {
      throw new InvalidRequiredError('AlbumId');
    }

    this.albumId = albumId;
    this.updatedAt = new Date();
  }

  toPrimitives() {
    return {
      id: this.getId().toString(),
      title: this.getTitle(),
      year: this.getYear(),
      genre: this.getGenre(),
      performer: this.getPerformer(),
      duration: this.getDuration(),
      albumId: this.getAlbumId(),
      createdAt: this.getCreatedAt(),
      updatedAt: this.getUpdatedAt(),
    };
  }
}
