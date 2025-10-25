import { AuthService } from './auth.service';
import { HapiHandler } from '../../types/hapi';
import { loginSchema, refreshTokenSchema } from './auth.schema';

export class AuthHandler {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  login: HapiHandler = async (req) => {
    const payload = await loginSchema.parseAsync(req.payload);
    const response = await this.authService.login(payload);

    return response;
  };

  updateAccessToken: HapiHandler = async (req) => {
    const payload = await refreshTokenSchema.parseAsync(req.payload);
    const response = await this.authService.updateAccessToken(payload.refreshToken);

    return response;
  };

  deleteRefreshToken: HapiHandler = async (req) => {
    const payload = await refreshTokenSchema.parseAsync(req.payload);
    const response = await this.authService.deleteRefreshToken(payload.refreshToken);

    return response;
  };
}
