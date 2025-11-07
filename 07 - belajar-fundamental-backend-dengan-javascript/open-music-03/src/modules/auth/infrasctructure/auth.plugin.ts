import { Plugin } from '@hapi/hapi';
import { serviceContainer } from '../../../shared/utils/service-container';
import { SERVICE_KEYS } from '../../../shared/constants/service-keys.constant';
import { JwtService } from './security/jwt.service';
import { PasswordService } from './security/password.service';

export const authPlugin: Plugin<undefined> = {
  name: 'authentications',
  version: '1.0.0',
  register: async () => {
    const jwtService = new JwtService();
    const passwordService = new PasswordService();

    serviceContainer.register(SERVICE_KEYS.JWT_SERVICE, jwtService);
    serviceContainer.register(SERVICE_KEYS.PASSWORD_SERVICE, passwordService);
  },
};
