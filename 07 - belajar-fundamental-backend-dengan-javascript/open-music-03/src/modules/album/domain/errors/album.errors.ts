export class InvalidAlbumNameError extends Error {
  constructor() {
    super('Album name must be at least 2 characters long.');
  }
}

export class InvalidAlbumYearError extends Error {
  constructor() {
    super('Album year must be a valid number.');
  }
}
