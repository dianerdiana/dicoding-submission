import { HapiHandler } from '../../../../shared/types/hapi-handler.type';
import { DeleteAuthUseCase } from '../../application/use-case/delete-auth.use-case';
import { RefreshTokenUseCase } from '../../application/use-case/refresh-token.use-case';
import { SignInUseCase } from '../../application/use-case/signin.use-case';
import { validateRefreshToken } from '../validators/refresh-token.validator';
import { validateSignIn } from '../validators/signin.validator';

export class AuthHandler {
  constructor(
    private readonly signInUseCase: SignInUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly deleteAuthUseCase: DeleteAuthUseCase,
  ) {}

  signIn: HapiHandler = async (req, h) => {
    const payload = await validateSignIn(req.payload);
    const tokens = await this.signInUseCase.execute(payload);

    return h
      .response({
        status: 'success',
        message: 'Success',
        data: tokens,
      })
      .code(201);
  };

  refreshToken: HapiHandler = async (req, h) => {
    const payload = await validateRefreshToken(req.payload);
    const accessToken = await this.refreshTokenUseCase.execute(payload);

    return h.response({
      status: 'success',
      message: 'Success',
      data: { accessToken },
    });
  };

  deleteAuth: HapiHandler = async (req, h) => {
    const payload = await validateRefreshToken(req.payload);
    await this.deleteAuthUseCase.execute(payload);

    return h.response({
      status: 'success',
      message: 'Success',
    });
  };
}
