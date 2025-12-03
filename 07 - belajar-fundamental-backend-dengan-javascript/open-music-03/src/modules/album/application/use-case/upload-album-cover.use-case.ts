import { AlbumRepository } from '../../infrastructure/album.repository';
import { UploadAlbumCoverDto } from '../dto/upload-album-cover.dto';

export class UploadAlbumCoverUseCase {
  constructor(private readonly albumRepository: AlbumRepository) {}

  async execute(payload: UploadAlbumCoverDto) {}
}
