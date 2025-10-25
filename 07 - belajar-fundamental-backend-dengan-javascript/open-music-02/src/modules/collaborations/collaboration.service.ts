import { CollaborationRepository } from './collaboration.repository';

export class CollaborationService {
  private collaborationRepository: CollaborationRepository;

  constructor(collaborationRepository: CollaborationRepository) {
    this.collaborationRepository = collaborationRepository;
  }
}
