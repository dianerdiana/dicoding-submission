import { BadRequestError } from '../../../../shared/errors/app-error';
import { AuthRepository } from '../../infrasctructure/auth.repository';
import { JwtService } from '../../infrasctructure/security/jwt.service';
import { RefreshTokenDto } from '../dto/refresh-token.dto';

export class RefreshTokenUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authRepository: AuthRepository,
  ) {}

  async execute(payload: RefreshTokenDto) {
    const { refreshToken } = payload;
    const { userId, username } = this.jwtService.verifyToken(refreshToken, 'refresh');
    const auth = await this.authRepository.findByUserId(userId);

    console.log(refreshToken, auth?.getRefreshToken());
    if (!auth || auth.getRefreshToken() !== refreshToken) {
      throw new BadRequestError('Invalid token');
    }

    const accessToken = this.jwtService.generateAccessToken({
      userId,
      username,
    });

    return accessToken;
  }
}
