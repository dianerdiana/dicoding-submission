import { createCollaborationSchema } from '../../application/schemas/create-collaboration.schema';

export const validateCreateCollaboration = async (payload: unknown) =>
  await createCollaborationSchema.parseAsync(payload);
