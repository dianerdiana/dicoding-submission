import { NotFoundError } from '../../../../shared/errors/app-error';
import { AlbumId } from '../../domain/value-objects/album-id.vo';
import { AlbumRepository } from '../../infrastructure/album.repository';

export class GetAlbumByIdUseCase {
  constructor(private readonly albumRepository: AlbumRepository) {}

  async execute(id: string) {
    const albumId = new AlbumId(id);
    const album = await this.albumRepository.findById(albumId);

    if (!album) {
      throw new NotFoundError('Album is not found');
    }

    return album.toPrimitives();
  }
}
