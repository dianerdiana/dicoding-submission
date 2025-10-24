import { ResponseObject } from '@hapi/hapi';
import { UserService } from './auth.service';
import { HapiHandler } from '../../types/hapi';
import { successResponse } from '../../utils/response';
import { createUserSchema } from './auth.schema';
import { validateUUID } from '../../utils/validateUUID';

export class UserHandler {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  createUser: HapiHandler = async (req, res): Promise<ResponseObject> => {
    const payload = await createUserSchema.parseAsync(req.payload);
    const userId = await this.userService.createUser(payload);

    return successResponse({ res, data: { userId }, code: 201 });
  };

  getUserById: HapiHandler = async (req, res): Promise<ResponseObject> => {
    const { id } = req.params;
    validateUUID(id);

    const user = await this.userService.getUserById(id);

    return successResponse({ res, data: { user }, code: 200 });
  };

  deleteUser: HapiHandler = async (req, res): Promise<ResponseObject> => {
    const { id } = req.params;
    validateUUID(id);

    await this.userService.deleteUser(id);

    return successResponse({
      res,
      message: 'Successfuly deleted users',
      data: { user: {} },
      code: 200,
    });
  };
}
