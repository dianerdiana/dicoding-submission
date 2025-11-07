import { UserRepository } from '../../infrastructure/user.repository';

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute() {}
}
