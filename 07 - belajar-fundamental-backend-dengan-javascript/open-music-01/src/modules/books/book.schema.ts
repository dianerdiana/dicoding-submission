import { z } from 'zod';

export const createBookSchema = z
  .object({
    name: z
      .string({ error: 'Gagal menambahkan buku. Mohon isi nama buku' })
      .min(1, 'Gagal menambahkan buku. Mohon isi nama buku'),
    year: z.number(),
    author: z.string(),
    summary: z.string(),
    publisher: z.string(),
    pageCount: z.number(),
    readPage: z.number(),
    reading: z.boolean(),
  })
  .refine((data: any) => data.readPage <= data.pageCount, {
    message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    path: ['readPage'],
  });

export const updateBookSchema = z
  .object({
    name: z
      .string({ error: 'Gagal memperbarui buku. Mohon isi nama buku' })
      .min(1, 'Gagal memperbarui buku. Mohon isi nama buku'),
    year: z.number().optional(),
    author: z.string().optional(),
    summary: z.string().optional(),
    publisher: z.string().optional(),
    pageCount: z.number().optional(),
    readPage: z.number().optional(),
    reading: z.boolean().optional(),
  })
  .refine(
    (data: any) => {
      if (data.readPage !== undefined && data.pageCount !== undefined) {
        return data.readPage <= data.pageCount;
      }
      return true;
    },
    {
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      path: ['readPage'],
    },
  )
  .refine((data: any) => Object.keys(data).length > 0, {
    message: 'Minimal satu properti harus diperbarui',
  });

export type CreateBookPayload = z.infer<typeof createBookSchema>;
export type UpdateBookPayload = z.infer<typeof updateBookSchema>;
