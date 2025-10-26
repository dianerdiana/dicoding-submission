import z from 'zod';
import { createCollaborationSchema } from './collaboration.schema';
import { CollaborationEntity } from './collaboration.entity';

// Payload
export type CreateCollaborationPayloadDto = z.infer<typeof createCollaborationSchema> & {
  authId: string;
};
export type DeleteCollaborationPayloadDto = {
  playlistId: string;
  userId: string;
  authId: string;
};
export type GetCollaboratorPayloadDto = {
  playlistId: string;
  userId: string;
};

// Response
export type CreateCollaborationResponseDto = {
  collaborationId: string;
};
export type GetAllCollaborationResponseDto = {
  collaborations: CollaborationEntity[];
};

export type GetCollaborationResponseDto = {
  collaboration: CollaborationEntity & { username: string };
};
