import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi';
import { ApiResponse } from '../utils/api-response';

export type HapiHandler = (
  req: Request,
  h: ResponseToolkit,
) => Promise<ApiResponse | ResponseObject | void> | ApiResponse | ResponseObject | void;
