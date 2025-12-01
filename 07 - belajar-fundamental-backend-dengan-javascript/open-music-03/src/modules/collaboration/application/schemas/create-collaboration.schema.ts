import z from 'zod';

export const createCollaborationSchema = z.object({
  playlistId: z.string(),
  userId: z.string(),
});
