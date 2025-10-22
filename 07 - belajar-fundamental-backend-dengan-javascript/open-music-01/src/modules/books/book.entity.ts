import { nanoid } from 'nanoid';

export interface BookProps {
  id: string;
  name: string;
  year: number;
  author: string;
  summary: string;
  publisher: string;
  pageCount: number;
  readPage: number;
  finished: boolean;
  reading: boolean;
  insertedAt: string;
  updatedAt: string;
}

export class Book implements BookProps {
  id: string;
  name: string;
  year: number;
  author: string;
  summary: string;
  publisher: string;
  pageCount: number;
  readPage: number;
  finished: boolean;
  reading: boolean;
  insertedAt: string;
  updatedAt: string;

  constructor({
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  }: Omit<BookProps, 'id' | 'finished' | 'insertedAt' | 'updatedAt'>) {
    this.id = nanoid(16);

    if (readPage && pageCount && readPage > pageCount) {
      throw new Error('Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount');
    }

    this.name = name;
    this.year = year;
    this.author = author;
    this.summary = summary;
    this.publisher = publisher;
    this.pageCount = pageCount;
    this.readPage = readPage;
    this.reading = reading;

    const timestamp = new Date().toISOString();
    this.finished = this.pageCount === this.readPage;
    this.insertedAt = timestamp;
    this.updatedAt = timestamp;
  }

  update({
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  }: Partial<Omit<BookProps, 'id' | 'insertedAt' | 'updatedAt' | 'finished'>>) {
    if (name !== undefined) this.name = name;
    if (year !== undefined) this.year = year;
    if (author !== undefined) this.author = author;
    if (summary !== undefined) this.summary = summary;
    if (publisher !== undefined) this.publisher = publisher;
    if (pageCount !== undefined) this.pageCount = pageCount;
    if (readPage !== undefined) this.readPage = readPage;
    if (reading !== undefined) this.reading = reading;

    this.finished = this.pageCount === this.readPage;
    this.updatedAt = new Date().toISOString();
  }
}
