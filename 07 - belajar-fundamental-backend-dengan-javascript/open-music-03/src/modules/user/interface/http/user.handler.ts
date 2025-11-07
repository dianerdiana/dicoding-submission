import { HapiHandler } from '../../../../shared/types/hapi-handler.type';
import { CreateUserUseCase } from '../../application/use-case/create-user.use-case';
import { validateCreateUser } from '../validators/create-user.validator';

export class UserHandler {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  createUser: HapiHandler = async (req, h) => {
    const payload = await validateCreateUser(req.payload);
    const userId = await this.createUserUseCase.execute(payload);

    return h
      .response({
        status: 'success',
        message: 'Successfuly created user',
        data: { userId },
      })
      .code(201);
  };
}
