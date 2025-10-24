import { ResponseObject } from '@hapi/hapi';
import { AuthService } from './auth.service';
import { HapiHandler } from '../../types/hapi';
import { successResponse } from '../../utils/response';
import { loginSchema, refreshTokenSchema } from './auth.schema';

export class AuthHandler {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  login: HapiHandler = async (req, res): Promise<ResponseObject> => {
    const payload = await loginSchema.parseAsync(req.payload);
    const response = await this.authService.login(payload);

    return successResponse({ res, data: response, code: 201 });
  };

  updateAccessToken: HapiHandler = async (req, res): Promise<ResponseObject> => {
    const payload = await refreshTokenSchema.parseAsync(req.payload);
    const accessToken = await this.authService.updateAccessToken(payload.refreshToken);

    return successResponse({ res, data: { accessToken }, code: 200 });
  };

  deleteRefreshToken: HapiHandler = async (req, res): Promise<ResponseObject> => {
    const payload = await refreshTokenSchema.parseAsync(req.payload);
    await this.authService.deleteRefreshToken(payload.refreshToken);

    return successResponse({ res, message: 'Successfuly deleted refresh token', code: 200 });
  };
}
