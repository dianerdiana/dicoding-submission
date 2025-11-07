// src/modules/auth/infrastructure/security/jwt.service.ts
import Jwt from '@hapi/jwt';
import { env } from '../../../../app/configs/env.config';
import { BadRequestError } from '../../../../shared/errors/app-error';

export class JwtService {
  generateAccessToken(payload: object): string {
    return Jwt.token.generate(payload, env.token.accessTokenKey);
  }

  generateRefreshToken(payload: object): string {
    return Jwt.token.generate(payload, env.token.refreshTokenKey);
  }

  verify(token: string, type: 'access' | 'refresh'): any {
    try {
      const secret = type === 'access' ? env.token.accessTokenKey : env.token.refreshTokenKey;
      const artifacts = Jwt.token.decode(token);
      Jwt.token.verifySignature(artifacts, secret);
      const { payload } = artifacts.decoded;
      return payload;
    } catch (error) {
      console.error(error);
      throw new BadRequestError('Token is not valid');
    }
  }
}
