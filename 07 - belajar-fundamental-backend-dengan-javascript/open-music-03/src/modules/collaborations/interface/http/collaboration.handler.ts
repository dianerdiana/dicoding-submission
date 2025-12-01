import { AuthCredential } from '../../../../shared/types/auth-credential.type';
import { HapiHandler } from '../../../../shared/types/hapi-handler.type';
import { ApiResponse } from '../../../../shared/utils/api-response';
import { CreateCollaborationUseCase } from '../../application/use-case/create-collaboration.use-case';
import { DeleteCollaborationUseCase } from '../../application/use-case/delete-collaboration.use-case';
import { validateCreateCollaboration } from '../validators/create-collaboration.validator';

export class CollaborationHandler {
  constructor(
    private readonly createCollaborationUseCase: CreateCollaborationUseCase,
    private readonly deleteCollaborationUseCase: DeleteCollaborationUseCase,
  ) {}

  createCollaboration: HapiHandler = async (req) => {
    const { userId } = req.auth.credentials as AuthCredential;
    const payload = await validateCreateCollaboration(req.payload);
    const collaborationId = await this.createCollaborationUseCase.execute({
      ...payload,
      authId: userId,
    });

    return ApiResponse.created({ data: { collaborationId } });
  };

  deleteCollaboration: HapiHandler = async (req) => {
    const payload = await validateCreateCollaboration(req.payload);
    await this.deleteCollaborationUseCase.execute(payload);

    return ApiResponse.deleted({ message: 'Succesfuly deleted collaboration' });
  };
}
