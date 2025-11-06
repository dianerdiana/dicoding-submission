import { NotFoundError } from '../../../../shared/errors/app-error';
import { AlbumId } from '../../domain/value-objects/album-id.vo';
import { AlbumRepository } from '../../infrastructure/album.repository';
import { UpdateAlbumDto } from '../dto/update-album.dto';

export class UpdateAlbumUseCase {
  constructor(private readonly albumRepository: AlbumRepository) {}

  async execute(id: string, dto: UpdateAlbumDto) {
    const albumId = new AlbumId(id);
    const album = await this.albumRepository.findById(albumId);

    if (!album) {
      throw new NotFoundError('Album is not found');
    }

    album.updateName(dto.name);
    album.updateYear(dto.year);

    await this.albumRepository.save(album);

    return album.toPrimitives();
  }
}
