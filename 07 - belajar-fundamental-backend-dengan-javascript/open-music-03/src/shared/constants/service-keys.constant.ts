export const SERVICE_KEYS = {
  JWT_SERVICE: 'JwtService',
  PASSWORD_SERVICE: 'PasswordService',
  // Album
  GET_ALBUM_BY_ID_USE_CASE: 'GetAlbumByIdUseCase',
  // Song
  GET_ALL_SONGS_USE_CASE: 'GetAllSongsUseCase',
  GET_SONG_BY_ID_USE_CASE: 'GetSongByIdUseCase',
  GET_ALL_SONG_BY_IDS_USE_CASE: 'GetSongsByIdsUseCase',
  // User
  SIGN_IN_USER_USE_CASE: 'SignInUserUseCase',
  GET_USER_BY_IDS_USE_CASE: 'GetUserByIdsUseCase',
  GET_USER_BY_ID_USE_CASE: 'GetUserByIdUseCase',
  // Playlist
  GET_PLAYLIST_BY_ID_USE_CASE: 'GetPlaylistByIdUseCase',
  // Playlist Song
  GET_PLAYLIST_SONGS_USE_CASE: 'GetPlaylistSongsUseCase',
  // Collaboration
  GET_ALL_COLLABORATION_BY_USER_ID_USE_CASE: 'GetAllCollaborationByUserIdUseCase',
  GET_COLLABORATION_USE_CASE: 'GetCollaborationUseCase',
  // Playlist Song Activity
  CREATE_PLAYLIST_SONG_ACTIVITY_USE_CASE: 'CreatePlaylistSongActivityUseCase',
} as const;

export type ServiceKey = (typeof SERVICE_KEYS)[keyof typeof SERVICE_KEYS];
