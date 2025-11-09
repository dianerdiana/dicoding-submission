import { NotFoundError } from '../../../../shared/errors/app-error';
import { UserRepository } from '../../infrastructure/user.repository';

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundError('User is not found');
    }

    return user.toSafePrimitives();
  }
}
