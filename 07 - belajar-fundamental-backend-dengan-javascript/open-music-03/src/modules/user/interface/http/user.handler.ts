import { HapiHandler } from '../../../../shared/types/hapi-handler.type';
import { ApiResponse } from '../../../../shared/utils/api-response';
import { CreateUserUseCase } from '../../application/use-case/create-user.use-case';
import { validateCreateUser } from '../validators/create-user.validator';

export class UserHandler {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  createUser: HapiHandler = async (req) => {
    const payload = await validateCreateUser(req.payload);
    const userId = await this.createUserUseCase.execute(payload);

    return ApiResponse.created({ message: 'Successfuly created user', data: { userId } });
  };
}
