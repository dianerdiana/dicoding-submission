import { UserRepository } from '../../infrastructure/user.repository';

export class GetUserByIdsUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userIds: string[]) {
    const users = await this.userRepository.findByIds(userIds);
    return users.map((user) => user.toSafePrimitives());
  }
}
