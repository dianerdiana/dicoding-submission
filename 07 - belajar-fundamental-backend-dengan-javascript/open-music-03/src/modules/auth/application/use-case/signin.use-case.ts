import { SERVICE_KEYS } from '../../../../shared/constants/service-keys.constant';
import { serviceContainer } from '../../../../shared/utils/service-container';
import { SignInUserUseCase } from '../../../user/application/use-case/sign-in-user.use-case';
import { Auth } from '../../domain/entities/auth.entity';
import { AuthRepository } from '../../infrasctructure/auth.repository';
import { JwtService } from '../../infrasctructure/security/jwt.service';
import { SignInDto } from '../dto/signin.dto';

export class SignInUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authRepository: AuthRepository,
  ) {}

  async execute(payload: SignInDto) {
    const getUserByUsername = serviceContainer.get<SignInUserUseCase>(
      SERVICE_KEYS.SIGN_IN_USER_USE_CASE,
    );
    const { username, password } = payload;

    const user = await getUserByUsername.execute(username, password);
    const accessToken = this.jwtService.generateAccessToken({
      userId: user.id,
      username: user.username,
    });
    const refreshToken = this.jwtService.generateRefreshToken({
      userId: user.id,
      username: user.username,
    });

    const existingAuth = await this.authRepository.findByUserId(user.id);

    if (!existingAuth) {
      const auth = Auth.create({ userId: user.id, refreshToken });
      await this.authRepository.save(auth);
    }

    return { accessToken, refreshToken };
  }
}
