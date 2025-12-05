import type { Channel, ConsumeMessage } from 'amqplib';
import { GetPlaylistByIdUseCase } from '@modules/application/use-case/get-playlist-by-id.use-case.js';
import { GetAllSongIdsUseCase } from '@modules/application/use-case/get-all-song-ids.use-case.js';
import { GetAllSongByIdsUseCase } from '@modules/application/use-case/get-all-song-by-ids.use-case.js';
import { EmailWorker } from '@app/workers/email.worker.js';

export class ExportPlaylistSongListener {
  constructor(
    private readonly getPlaylistByIdUseCase: GetPlaylistByIdUseCase,
    private readonly getAllSongIdsUseCase: GetAllSongIdsUseCase,
    private readonly getAllSongByIdsUseCase: GetAllSongByIdsUseCase,
    private readonly emailWorker: EmailWorker
  ) {
    this.listen = this.listen.bind(this);
  }

  async listen(message: ConsumeMessage | null, channel: Channel) {
    try {
      if (message) {
        const { playlistId, targetEmail } = JSON.parse(message.content.toString()) as {
          playlistId: string;
          targetEmail: string;
        };

        const playlist = await this.getPlaylistByIdUseCase.execute(playlistId);
        const songIds = await this.getAllSongIdsUseCase.execute(playlist.id);
        const songs = await this.getAllSongByIdsUseCase.execute(songIds);

        const messageContent = {
          playlist: {
            id: playlist.id,
            name: playlist.name,
            songs,
          },
        };

        const result = await this.emailWorker.sendMail(targetEmail, JSON.stringify(messageContent));
        console.log(`[Nodemailer]: Message sent to ${targetEmail} with id ${result.messageId}`);

        channel.ack(message);
      }
    } catch (error) {
      console.log(error);

      if (message) {
        channel.nack(message, false, false);
      }
    }
  }
}
