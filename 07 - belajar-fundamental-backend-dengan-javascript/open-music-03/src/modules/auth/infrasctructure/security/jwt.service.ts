// src/modules/auth/infrastructure/security/jwt.service.ts
import Jwt from '@hapi/jwt';
import { env } from '../../../../app/configs/env.config';
import { BadRequestError } from '../../../../shared/errors/app-error';
import { AuthCredential } from '../../../../shared/types/auth-credential.type';

export class JwtService {
  generateAccessToken(payload: AuthCredential): string {
    return Jwt.token.generate(payload, env.token.accessTokenKey);
  }

  generateRefreshToken(payload: AuthCredential): string {
    return Jwt.token.generate(payload, env.token.refreshTokenKey);
  }

  verifyToken(token: string, type: 'access' | 'refresh'): AuthCredential {
    try {
      const secret = type === 'access' ? env.token.accessTokenKey : env.token.refreshTokenKey;
      const artifacts = Jwt.token.decode(token);

      Jwt.token.verifySignature(artifacts, secret);

      const { payload } = artifacts.decoded;
      return payload as AuthCredential;
    } catch (error) {
      console.error(error);
      throw new BadRequestError('Token is not valid');
    }
  }
}
