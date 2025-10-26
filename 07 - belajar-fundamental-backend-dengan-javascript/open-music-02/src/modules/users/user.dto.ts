import z from 'zod';
import { createUserSchema } from './user.schema';
import { UserEntity } from './user.entity';

// Payload
export type CreateUserPayloadDto = z.infer<typeof createUserSchema>;
export type ValidateUserPasswordPayloadDto = {
  username: string;
  password: string;
};

// Response
export type CreateUserResponseDto = { userId: string };
export type GetUserResponseDto = { user: Omit<UserEntity, 'password'> };
export type GetAllUserResponseDto = {
  users: Omit<UserEntity, 'password' | 'createdAt' | 'updatedAt'>[];
};
