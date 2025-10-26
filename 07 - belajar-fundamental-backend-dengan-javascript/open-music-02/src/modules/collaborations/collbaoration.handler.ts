import { CollaborationService } from './collaboration.service';

export class CollaborationHandler {
  private collaborationService: CollaborationService;
  constructor(collaborationService: CollaborationService) {
    this.collaborationService = collaborationService;
  }
}
