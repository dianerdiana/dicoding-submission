import z from 'zod';
import { getCollaborationSchema } from '../schemas/get-collaboration.schema';

export type GetCollaborationDto = z.infer<typeof getCollaborationSchema>;
