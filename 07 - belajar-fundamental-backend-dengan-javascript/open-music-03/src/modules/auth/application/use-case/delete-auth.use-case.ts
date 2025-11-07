import { BadRequestError } from '../../../../shared/errors/app-error';
import { AuthRepository } from '../../infrasctructure/auth.repository';
import { JwtService } from '../../infrasctructure/security/jwt.service';
import { RefreshTokenDto } from '../dto/refresh-token.dto';

export class DeleteAuthUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authRepository: AuthRepository,
  ) {}

  async execute(payload: RefreshTokenDto) {
    const { refreshToken } = payload;
    const { userId } = this.jwtService.verifyToken(refreshToken, 'refresh');
    const auth = await this.authRepository.findByUserId(userId);

    if (!auth || auth.getRefreshToken() !== refreshToken) {
      throw new BadRequestError('Invalid token');
    }

    const deleted = await this.authRepository.delete(auth);
    return deleted;
  }
}
