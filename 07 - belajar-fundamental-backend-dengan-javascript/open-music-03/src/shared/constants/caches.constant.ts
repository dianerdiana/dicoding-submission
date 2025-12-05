export const CACHES = {
  albumLike: (albumId: string) => `albumLike:${albumId}`,
  getSongById: (songId: string) => `song:${songId}`,
};
