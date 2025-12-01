export const SERVICE_KEYS = {
  JWT_SERVICE: 'JwtService',
  PASSWORD_SERVICE: 'PasswordService',
  // Song
  GET_ALL_SONGS_USE_CASE: 'GetAllSongsUseCase',
  GET_SONG_BY_ID_USE_CASE: 'GetSongByIdUseCase',
  GET_SONGS_BY_IDS_USE_CASE: 'GetSongsByIdsUseCase',
  // User
  SIGN_IN_USER_USE_CASE: 'SignInUserUseCase',
  GET_USER_BY_IDS_USE_CASE: 'GetUserByIdsUseCase',
  GET_USER_BY_ID_USE_CASE: 'GetUserByIdUseCase',
  // Playlist
  GET_PLAYLIST_BY_ID_USE_CASE: 'GetPlaylistByIdUseCase',
  // Collaboration
  GET_ALL_COLLABORATION_BY_USER_ID_USE_CASE: 'GetAllCollaborationByUserIdUseCase',
  GET_COLLABORATION_USE_CASE: 'GetCollaborationUseCase',
} as const;

export type ServiceKey = (typeof SERVICE_KEYS)[keyof typeof SERVICE_KEYS];
