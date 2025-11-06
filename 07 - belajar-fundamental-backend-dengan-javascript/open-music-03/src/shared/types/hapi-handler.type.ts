import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi';

export type HapiHandler = (
  req: Request,
  h: ResponseToolkit,
) => Promise<ResponseObject | void> | ResponseObject | void;
