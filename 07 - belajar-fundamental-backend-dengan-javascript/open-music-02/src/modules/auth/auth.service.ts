import { BadRequestError } from '../../common/AppError';
import { env } from '../../configs/env';
import { UserService } from '../users/user.service';
import { Auth } from './auth.entity';
import { AuthRepository } from './auth.repository';
import Jwt from '@hapi/jwt';
import { serviceContainer } from '../../common/ServiceContainer';
import { LoginDTO, TokenDTO } from './auth.dto';
import { SanitizedUserResponseDTO } from '../users/user.dto';
import { ApiResponse } from '../../common/ApiResponse';

export class AuthService {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  getUserService(): UserService {
    return serviceContainer.get<UserService>('UserService');
  }

  generateAccessToken(payload: TokenDTO) {
    return Jwt.token.generate(payload, env.token.accessTokenKey);
  }

  generateRefreshToken(payload: TokenDTO) {
    return Jwt.token.generate(payload, env.token.refreshTokenKey);
  }

  verifyRefreshToken(refreshToken: string): TokenDTO {
    try {
      const artifacts = Jwt.token.decode(refreshToken);
      Jwt.token.verifySignature(artifacts, env.token.refreshTokenKey);
      const { payload } = artifacts.decoded;
      return payload;
    } catch (error) {
      console.error(error);
      throw new BadRequestError('Token is not valid');
    }
  }

  async login({ username, password }: LoginDTO) {
    const userService = this.getUserService();

    await userService.validateUserPasswordByUsername({ username, password });
    const userResponse = await userService.getUserByUsername(username);
    const { user } = userResponse.data as SanitizedUserResponseDTO;

    const accessToken = this.generateAccessToken({ userId: user.id, username: user.username });
    const refreshToken = this.generateRefreshToken({ userId: user.id, username: user.username });

    const newAuth = new Auth({ userId: user.id, refreshToken });
    await this.authRepository.create(newAuth);
    return new ApiResponse({ data: { accessToken, refreshToken }, code: 201 });
  }

  async updateAccessToken(refreshToken: string) {
    const auth = await this.authRepository.findByRefreshToken(refreshToken);
    if (!auth) throw new BadRequestError('Token is not valid');

    const { userId, username } = this.verifyRefreshToken(refreshToken);

    const accessToken = this.generateAccessToken({ userId, username });
    return new ApiResponse({ data: { accessToken } });
  }

  async deleteRefreshToken(refreshToken: string) {
    const auth = await this.authRepository.findByRefreshToken(refreshToken);
    if (!auth) throw new BadRequestError('Token is not valid');

    await this.authRepository.delete(refreshToken);
    return new ApiResponse({ message: 'Successfuly deleted token' });
  }
}
