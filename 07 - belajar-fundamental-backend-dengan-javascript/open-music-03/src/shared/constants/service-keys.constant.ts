export const SERVICE_KEYS = {
  GET_ALL_SONGS_USE_CASE: 'GetAllSongsUseCase',
  JWT_SERVICE: 'JwtService',
  PASSWORD_SERVICE: 'PasswordService',
  SIGN_IN_USER_USE_CASE: 'SignInUserUseCase',
} as const;

export type ServiceKey = (typeof SERVICE_KEYS)[keyof typeof SERVICE_KEYS];
