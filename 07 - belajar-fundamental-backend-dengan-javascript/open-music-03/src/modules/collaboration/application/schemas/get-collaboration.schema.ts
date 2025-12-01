import z from 'zod';

export const getCollaborationSchema = z.object({
  playlistId: z.string(),
  userId: z.string(),
});
