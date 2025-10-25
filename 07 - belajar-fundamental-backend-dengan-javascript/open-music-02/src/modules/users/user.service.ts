import { NotFoundError, BadRequestError, UnauthorizedError } from '../../common/AppError';
import { hashPassword } from '../../utils/passwordHashing';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserPayload } from './user.schema';

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(payload: CreateUserPayload) {
    const user = new User(payload);
    const existing = await this.userRepository.findByUsername(payload.username);

    if (existing) {
      throw new BadRequestError(`Username is already used`);
    }

    const hashedPassword = await hashPassword(user.password);
    const newUser = await this.userRepository.create({
      ...user,
      password: hashedPassword,
    });

    if (!newUser) {
      throw new BadRequestError('Input is not valid');
    }

    return newUser.id;
  }

  async getUserByUsername(payload: string) {
    const existing = await this.userRepository.findByUsername(payload);

    if (!existing) {
      throw new UnauthorizedError('User is not found');
    }

    return existing;
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundError(`User with id ${id} is not found`);

    return user;
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundError(`User with id ${id} is not found`);

    await this.userRepository.delete(id);

    return true;
  }
}
