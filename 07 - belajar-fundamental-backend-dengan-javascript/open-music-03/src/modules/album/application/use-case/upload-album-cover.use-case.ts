import { NotFoundError } from '../../../../shared/errors/app-error';
import { getUploadDir } from '../../../../shared/utils/get-upload-dir';
import { AlbumId } from '../../domain/value-objects/album-id.vo';
import { AlbumRepository } from '../../infrastructure/album.repository';
import { UploadAlbumCoverDto } from '../dto/upload-album-cover.dto';
import fs from 'fs';

export class UploadAlbumCoverUseCase {
  constructor(private readonly albumRepository: AlbumRepository) {}

  async execute(payload: UploadAlbumCoverDto, id: string) {
    const albumId = new AlbumId(id);
    const album = await this.albumRepository.findById(albumId);

    if (!album) {
      throw new NotFoundError('Album is not found');
    }

    const uploadDir = getUploadDir();
    const file = payload.cover;
    const filename = file.hapi.filename;

    const uploadPath = `${uploadDir}/${filename}`;
    const fileStream = fs.createWriteStream(uploadPath);

    file.pipe(fileStream);

    await new Promise<void>((resolve, reject) => {
      fileStream.on('error', reject);
      file.on('end', resolve);
    });

    album.updateCoverUrl(filename);
    await this.albumRepository.save(album);

    return album.toPrimitives();
  }
}
