import { NotFoundError, ValidationError } from '../../common/AppError';
import { User } from './auth.entity';
import { UserRepository } from './auth.repository';
import { CreateUserPayload } from './auth.schema';

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(payload: CreateUserPayload) {
    const user = new User(payload);
    const newUser = await this.userRepository.create(user);

    if (!newUser) {
      throw new ValidationError('Input is not valid');
    }

    return newUser.id;
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
