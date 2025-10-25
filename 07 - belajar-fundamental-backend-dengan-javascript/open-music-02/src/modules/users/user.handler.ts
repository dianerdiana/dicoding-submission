import { UserService } from './user.service';
import { HapiHandler } from '../../types/hapi';
import { createUserSchema } from './user.schema';
import { validateUUID } from '../../utils/validateUUID';

export class UserHandler {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  createUser: HapiHandler = async (req) => {
    const payload = await createUserSchema.parseAsync(req.payload);
    const response = await this.userService.createUser(payload);
    return response;
  };

  getUserById: HapiHandler = async (req) => {
    const { id } = req.params;
    validateUUID(id);

    const response = await this.userService.getUserById(id);
    return response;
  };

  deleteUser: HapiHandler = async (req) => {
    const { id } = req.params;
    validateUUID(id);

    const response = await this.userService.deleteUser(id);
    return response;
  };
}
