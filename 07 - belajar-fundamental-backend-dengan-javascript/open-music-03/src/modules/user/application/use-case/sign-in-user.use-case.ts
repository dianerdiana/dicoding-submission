import { SERVICE_KEYS } from '../../../../shared/constants/service-keys.constant';
import { UnauthorizedError } from '../../../../shared/errors/app-error';
import { serviceContainer } from '../../../../shared/utils/service-container';
import { PasswordService } from '../../../auth/infrasctructure/security/password.service';
import { UserRepository } from '../../infrastructure/user.repository';

export class SignInUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(username: string, password: string) {
    const passwordService = serviceContainer.get<PasswordService>(SERVICE_KEYS.PASSWORD_SERVICE);
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new UnauthorizedError('Invalid username');
    }

    const match = await passwordService.compare(password, user.getPassword());

    if (!match) {
      throw new UnauthorizedError('Invalid username');
    }

    return user.toSafePrimitives();
  }
}
