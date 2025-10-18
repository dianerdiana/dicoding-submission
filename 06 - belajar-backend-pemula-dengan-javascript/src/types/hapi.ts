import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi';

export type HapiHandler = (
  req: Request,
  res: ResponseToolkit,
) => Promise<ResponseObject> | ResponseObject;
