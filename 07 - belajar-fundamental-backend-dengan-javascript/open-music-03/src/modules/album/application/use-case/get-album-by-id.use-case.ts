import { SERVICE_KEYS } from '../../../../shared/constants/service-keys.constant';
import { NotFoundError } from '../../../../shared/errors/app-error';
import { serviceContainer } from '../../../../shared/utils/service-container';
import { GetAllSongsUseCase } from '../../../song/application/use-case/get-all-songs.use-case';
import { AlbumId } from '../../domain/value-objects/album-id.vo';
import { AlbumRepository } from '../../infrastructure/album.repository';

export class GetAlbumByIdUseCase {
  constructor(private readonly albumRepository: AlbumRepository) {}

  async execute(id: string) {
    const getAllSongsUseCase = serviceContainer.get<GetAllSongsUseCase>(
      SERVICE_KEYS.GET_ALL_SONGS_USE_CASE,
    );

    const albumId = new AlbumId(id);
    const album = await this.albumRepository.findById(albumId);

    if (!album) {
      throw new NotFoundError('Album is not found');
    }

    const songs = await getAllSongsUseCase.execute({
      filters: [{ field: 'album_id', value: album.getId().toString() }],
    });

    return {
      ...album.toPrimitives(),
      songs,
    };
  }
}
