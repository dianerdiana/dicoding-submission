import { HapiHandler } from '../../../../shared/types/hapi-handler.type';
import { ApiResponse } from '../../../../shared/utils/api-response';
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

  signIn: HapiHandler = async (req) => {
    const payload = await validateSignIn(req.payload);
    const tokens = await this.signInUseCase.execute(payload);

    return ApiResponse.created({ data: tokens, message: 'Login success' });
  };

  refreshToken: HapiHandler = async (req) => {
    const payload = await validateRefreshToken(req.payload);
    const accessToken = await this.refreshTokenUseCase.execute(payload);

    return ApiResponse.updated({ data: { accessToken } });
  };

  deleteAuth: HapiHandler = async (req) => {
    const payload = await validateRefreshToken(req.payload);
    await this.deleteAuthUseCase.execute(payload);

    return ApiResponse.deleted({ message: 'Successfuly deleted auth' });
  };
}
