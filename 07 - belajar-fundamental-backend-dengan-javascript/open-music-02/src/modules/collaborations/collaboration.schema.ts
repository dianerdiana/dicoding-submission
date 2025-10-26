import z from 'zod';

export const createCollaborationSchema = z.object({
  playlistId: z.uuid(),
  userId: z.uuid(),
  userAuthId: z.uuid(),
});
