import { ApiResponse } from '../../common/ApiResponse';
import { NotFoundError, BadRequestError, UnauthorizedError } from '../../common/AppError';
import { comparePassword, hashPassword } from '../../utils/passwordHashing';
import {
  CreateUserPayloadDto,
  CreateUserResponseDto,
  GetAllUserResponseDto,
  GetUserResponseDto,
  ValidateUserPasswordPayloadDto,
} from './user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(payload: CreateUserPayloadDto) {
    const user = new User(payload);
    const existingUser = await this.userRepository.findByUsername(payload.username);
    if (existingUser) throw new BadRequestError(`Username is already used`);

    const hashedPassword = await hashPassword(user.password);
    const newUser = await this.userRepository.create({
      ...user,
      password: hashedPassword,
    });

    if (!newUser) throw new BadRequestError('Input is not valid');
    const responseData: CreateUserResponseDto = { userId: newUser.id };
    return new ApiResponse({ data: responseData, code: 201 });
  }

  async getUserByUsername(payload: string) {
    const existingUser = await this.userRepository.findByUsername(payload);
    if (!existingUser) throw new UnauthorizedError('User is not found');

    const responseData: GetUserResponseDto = {
      user: {
        id: existingUser.id,
        fullname: existingUser.fullname,
        username: existingUser.username,
        createdAt: existingUser.createdAt,
        updatedAt: existingUser.updatedAt,
      },
    };

    return new ApiResponse({ data: responseData });
  }

  async getUserById(id: string) {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) throw new NotFoundError(`User with id ${id} is not found`);

    const responseData: GetUserResponseDto = {
      user: {
        id: existingUser.id,
        fullname: existingUser.fullname,
        username: existingUser.username,
        createdAt: existingUser.createdAt,
        updatedAt: existingUser.updatedAt,
      },
    };

    return new ApiResponse({ data: responseData });
  }

  async getUserByIds(ids: string[]) {
    const existingUsers = await this.userRepository.findByIds(ids);
    const sanitizedUsers: GetAllUserResponseDto = { users: existingUsers };

    return new ApiResponse({ data: sanitizedUsers });
  }

  async deleteUser(id: string) {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) throw new NotFoundError(`User with id ${id} is not found`);

    await this.userRepository.delete(id);
    return new ApiResponse({ message: 'Successfuly deleted user' });
  }

  async validateUserPasswordByUsername({ username, password }: ValidateUserPasswordPayloadDto) {
    const existingUser = await this.userRepository.findByUsername(username);
    if (!existingUser) throw new UnauthorizedError('User is not found');

    const match = await comparePassword(password, existingUser.password);
    if (!match) throw new UnauthorizedError(`Username and password doesn't match`);

    return new ApiResponse({ message: 'ok', data: match });
  }
}
