import { deleteCollaborationSchema } from '../../application/schemas/delete-collaboration.schema';

export const validateDeleteCollaboration = async (payload: unknown) =>
  await deleteCollaborationSchema.parseAsync(payload);
