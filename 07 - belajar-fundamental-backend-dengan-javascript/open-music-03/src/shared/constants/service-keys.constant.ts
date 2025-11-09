export const SERVICE_KEYS = {
  JWT_SERVICE: 'JwtService',
  PASSWORD_SERVICE: 'PasswordService',
  // Song Use Case
  GET_ALL_SONGS_USE_CASE: 'GetAllSongsUseCase',
  GET_SONG_BY_ID_USE_CASE: 'GetSongByIdUseCase',
  // User use case
  SIGN_IN_USER_USE_CASE: 'SignInUserUseCase',
  GET_USER_BY_IDS_USE_CASE: 'GetUserByIdsUseCase',
  GET_USER_BY_ID_USE_CASE: 'GetUserByIdUseCase',
  // Playlist use case
  GET_PLAYLIST_BY_ID_USE_CASE: 'GetPlaylistByIdUseCase',
} as const;

export type ServiceKey = (typeof SERVICE_KEYS)[keyof typeof SERVICE_KEYS];
