import z from 'zod';
import { deleteCollaborationSchema } from '../schemas/delete-collaboration.schema';

export type DeleteCollaborationDto = z.infer<typeof deleteCollaborationSchema>;
