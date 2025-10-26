import z from 'zod';
import { createUserSchema } from './user.schema';

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type ValidateUserPasswordByUsername = {
  username: string;
  password: string;
};
export type SanitizedUserDto = {
  id: string;
  fullname: string;
  username: string;
  createdAt: string;
  updatedAt: string;
};
export type SanitizedUserResponseDto = {
  user: SanitizedUserDto;
};

export type SanitizedUsersResponseDto = {
  users: Omit<SanitizedUserDto, 'createdAt' | 'updatedAt'>[];
};
