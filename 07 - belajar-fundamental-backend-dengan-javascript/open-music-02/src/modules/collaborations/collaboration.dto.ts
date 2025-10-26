import z from 'zod';
import { createCollaborationSchema } from './collaboration.schema';

export type CreateCollaborationPayloadDto = z.infer<typeof createCollaborationSchema>;

export type CreateCollaborationResponseDto = {
  collaborationId: string;
};
