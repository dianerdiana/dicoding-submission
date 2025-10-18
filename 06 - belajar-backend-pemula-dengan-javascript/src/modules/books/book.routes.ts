import { ServerRoute } from '@hapi/hapi';

export const bookRoutes: ServerRoute[] = [
  {
    method: 'GET',
    path: '/',
    handler: (req, res) => {
      return res.response({ status: 'Yeay Berhasil' });
    },
  },
];
