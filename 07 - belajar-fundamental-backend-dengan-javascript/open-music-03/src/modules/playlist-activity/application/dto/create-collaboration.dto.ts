import z from 'zod';
import { createCollaborationSchema } from '../schemas/create-collaboration.schema';

export type CreateCollaborationDto = z.infer<typeof createCollaborationSchema>;
