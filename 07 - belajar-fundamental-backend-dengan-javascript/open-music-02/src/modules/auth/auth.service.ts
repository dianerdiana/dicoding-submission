import { BadRequestError } from '../../common/AppError';
import { env } from '../../configs/env';
import { UserService } from '../users/user.service';
import { Auth } from './auth.entity';
import { AuthRepository } from './auth.repository';
import Jwt from '@hapi/jwt';
import { serviceContainer } from '../../common/ServiceContainer';
import { LoginResponseDto, LoginPayloadDto, UpdateAccessTokenResponseDto } from './auth.dto';
import { GetUserResponseDto } from '../users/user.dto';
import { ApiResponse } from '../../common/ApiResponse';
import { AuthCredential } from '../../types/AuthCredential';

export class AuthService {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  private getUserService(): UserService {
    return serviceContainer.get<UserService>('UserService');
  }

  private generateAccessToken(payload: AuthCredential) {
    return Jwt.token.generate(payload, env.token.accessTokenKey);
  }

  private generateRefreshToken(payload: AuthCredential) {
    return Jwt.token.generate(payload, env.token.refreshTokenKey);
  }

  verifyRefreshToken(refreshToken: string): AuthCredential {
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

  async login({ username, password }: LoginPayloadDto) {
    const userService = this.getUserService();

    await userService.validateUserPasswordByUsername({ username, password });
    const userResponse = await userService.getUserByUsername(username);
    const { user } = userResponse.data as GetUserResponseDto;

    const accessToken = this.generateAccessToken({ authId: user.id, username: user.username });
    const refreshToken = this.generateRefreshToken({ authId: user.id, username: user.username });

    const newAuth = new Auth({ userId: user.id, refreshToken });
    await this.authRepository.create(newAuth);
    const responseData: LoginResponseDto = { accessToken, refreshToken };
    return new ApiResponse({ data: responseData, code: 201 });
  }

  async updateAccessToken(refreshToken: string) {
    const auth = await this.authRepository.findByRefreshToken(refreshToken);
    if (!auth) throw new BadRequestError('Token is not valid');

    const { authId, username } = this.verifyRefreshToken(refreshToken);

    const accessToken = this.generateAccessToken({ authId, username });
    const responseData: UpdateAccessTokenResponseDto = { accessToken };
    return new ApiResponse({ data: responseData });
  }

  async deleteRefreshToken(refreshToken: string) {
    const auth = await this.authRepository.findByRefreshToken(refreshToken);
    if (!auth) throw new BadRequestError('Token is not valid');

    await this.authRepository.delete(refreshToken);
    return new ApiResponse({ message: 'Successfuly deleted token' });
  }
}
