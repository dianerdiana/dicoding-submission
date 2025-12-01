import z from 'zod';

export const deleteCollaborationSchema = z.object({
  playlistId: z.string(),
  userId: z.string(),
});
