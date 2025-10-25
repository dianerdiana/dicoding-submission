import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi';
import { ApiResponse } from '../common/ApiResponse';

export type HapiHandler = (
  req: Request,
  res: ResponseToolkit,
) => Promise<ApiResponse | ResponseObject | void> | ApiResponse | ResponseObject | void;
