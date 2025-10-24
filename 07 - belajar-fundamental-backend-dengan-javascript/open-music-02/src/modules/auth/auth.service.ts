import { BadRequestError, UnauthorizedError } from '../../common/AppError';
import { env } from '../../configs/env';
import { comparePassword } from '../../utils/passwordHashing';
import { UserService } from '../users/user.service';
import { Auth } from './auth.entity';
import { AuthRepository } from './auth.repository';
import Jwt from '@hapi/jwt';
import { LoginPayload, TokenPayload } from './auth.schema';
import { serviceContainer } from '../../common/ServiceContainer';

export class AuthService {
  private authRepository: AuthRepository;
  private userService: UserService;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
    this.userService = serviceContainer.get<UserService>('UserService');
  }

  generateAccessToken(payload: TokenPayload) {
    return Jwt.token.generate(payload, env.token.accessTokenKey);
  }

  generateRefreshToken(payload: TokenPayload) {
    return Jwt.token.generate(payload, env.token.refreshTokenKey);
  }

  verifyRefreshToken(refreshToken: string): TokenPayload {
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

  async login({ username, password }: LoginPayload) {
    const user = await this.userService.findUserByUsername(username);
    const match = await comparePassword(password, user.password);

    if (!match) {
      throw new UnauthorizedError(`Username and password doesn't match`);
    }

    const accessToken = this.generateAccessToken({ userId: user.id, username: user.username });
    const refreshToken = this.generateRefreshToken({ userId: user.id, username: user.username });

    const newAuth = new Auth({ userId: user.id, refreshToken });
    await this.authRepository.create(newAuth);

    return { accessToken, refreshToken };
  }

  async updateAccessToken(refreshToken: string) {
    const auth = await this.authRepository.findByRefreshToken(refreshToken);

    if (!auth) {
      throw new BadRequestError('Token is not valid');
    }

    const { userId, username } = this.verifyRefreshToken(refreshToken);

    const accessToken = this.generateAccessToken({ userId, username });
    return accessToken;
  }

  async deleteRefreshToken(refreshToken: string) {
    const auth = await this.authRepository.findByRefreshToken(refreshToken);

    if (!auth) {
      throw new BadRequestError('Token is not valid');
    }

    await this.authRepository.delete(refreshToken);

    return true;
  }
}
