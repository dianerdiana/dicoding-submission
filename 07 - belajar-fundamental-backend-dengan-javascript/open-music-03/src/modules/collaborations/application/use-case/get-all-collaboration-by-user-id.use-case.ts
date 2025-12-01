import { CollaborationRepository } from '../../infrasctructure/collaboration.repository';

export class GetAllCollaborationByUserIdUseCase {
  constructor(private readonly collaborationRepository: CollaborationRepository) {}

  async execute(userId: string) {
    const collaborations = await this.collaborationRepository.findAllByUserId(userId);
    const response = [];

    for (let i = 0; i < collaborations.length; i++) {
      const collaboration = collaborations[i];
      response.push(collaboration.toPrimitives());
    }

    return response;
  }
}
