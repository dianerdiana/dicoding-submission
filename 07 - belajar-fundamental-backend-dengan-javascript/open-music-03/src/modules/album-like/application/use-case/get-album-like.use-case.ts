import { AlbumLikeRepository } from '../../infrasctructure/album-like.repository';

export class GetAlbumLikeUseCase {
  constructor(private readonly albumLikeRepository: AlbumLikeRepository) {}

  async execute(albumId: string) {
    const count = await this.albumLikeRepository.countAllByAlbumId(albumId);

    return { likes: count };
  }
}
