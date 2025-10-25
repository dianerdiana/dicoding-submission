import z from 'zod';
import { createUserSchema } from './user.schema';

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type ValidateUserPasswordByUsername = {
  username: string;
  password: string;
};
export type SanitizedUserResponseDto = {
  user: {
    id: string;
    fullname: string;
    username: string;
    createdAt: string;
    updatedAt: string;
  };
};
