import { SERVICE_KEYS } from '../../../../shared/constants/service-keys.constant';
import { BadRequestError } from '../../../../shared/errors/app-error';
import { serviceContainer } from '../../../../shared/utils/service-container';
import { PasswordService } from '../../../auth/infrasctructure/security/password.service';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../infrastructure/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(payload: CreateUserDto) {
    const passwordService = serviceContainer.get<PasswordService>(SERVICE_KEYS.PASSWORD_SERVICE);

    const { fullname, username, password } = payload;
    const existing = await this.userRepository.findByUsername(username);

    if (existing) {
      throw new BadRequestError('Username has already been taken');
    }

    const hashPassword = await passwordService.hash(password);
    const user = User.create({ fullname, username, password: hashPassword });

    await this.userRepository.save(user);

    return user.getId().toString();
  }
}
