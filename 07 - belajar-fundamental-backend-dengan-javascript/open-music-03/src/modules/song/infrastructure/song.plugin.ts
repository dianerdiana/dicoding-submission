import { Plugin } from '@hapi/hapi';
import { SongRepository } from './song.repository';
import { SongHandler } from '../interface/http/song.handler';
import { SongRoute } from '../interface/http/song.route';
import { CreateSongUseCase } from '../application/use-case/create-song.use-case';
import { GetSongByIdUseCase } from '../application/use-case/get-song-by-id.use-case';
import { UpdateSongUseCase } from '../application/use-case/update-song.use-case';
import { DeleteSongUseCase } from '../application/use-case/delete-song.use-case';
import { GetAllSongsUseCase } from '../application/use-case/get-all-songs.use-case';
import { serviceContainer } from '../../../shared/utils/service-container';
import { SERVICE_KEYS } from '../../../shared/constants/service-keys.constant';
import { GetSongsByIdsUseCase } from '../application/use-case/get-songs-by-ids.use-case';

export const songPlugin: Plugin<undefined> = {
  name: 'songs',
  version: '1.0.0',
  register: async (server) => {
    const songRepository = new SongRepository();

    const createSongUseCase = new CreateSongUseCase(songRepository);
    const getAllSongsUseCase = new GetAllSongsUseCase(songRepository);
    const getSongByIdUseCase = new GetSongByIdUseCase(songRepository);
    const getSongsByIdsUseCase = new GetSongsByIdsUseCase(songRepository);
    const updateSongUseCase = new UpdateSongUseCase(songRepository);
    const deleteSongUseCase = new DeleteSongUseCase(songRepository);

    const songHandler = new SongHandler(
      createSongUseCase,
      getAllSongsUseCase,
      getSongByIdUseCase,
      updateSongUseCase,
      deleteSongUseCase,
    );
    serviceContainer.register(SERVICE_KEYS.GET_ALL_SONGS_USE_CASE, getAllSongsUseCase);
    serviceContainer.register(SERVICE_KEYS.GET_SONG_BY_ID_USE_CASE, getSongByIdUseCase);
    serviceContainer.register(SERVICE_KEYS.GET_SONGS_BY_IDS_USE_CASE, getSongsByIdsUseCase);
    server.route(new SongRoute(songHandler).routes());
  },
};
