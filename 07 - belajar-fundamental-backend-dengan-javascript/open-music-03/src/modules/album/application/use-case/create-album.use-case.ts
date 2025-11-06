import { Album } from '../../domain/entities/album.entity';
import { AlbumRepository } from '../../infrastructure/album.repository';
import { CreateAlbumDto } from '../dto/create-album.dto';

export class CreateAlbumUseCase {
  constructor(private readonly albumRepository: AlbumRepository) {}

  async execute(dto: CreateAlbumDto) {
    const album = Album.create(dto.name, dto.year);
    await this.albumRepository.save(album);
    return album.getId().toString();
  }
}
