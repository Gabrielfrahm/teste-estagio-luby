import { Response, Request } from 'express';
import { container } from 'tsyringe';

import UpdateAvatarService from '@modules/users/services/UpdateAvatarService';
import AppError from '@shared/error/AppError';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const updateAvatar = container.resolve(UpdateAvatarService);

      const user = await updateAvatar.execute({
        user_id: request.user.id,
        avatarFileName: request.file.filename,
      });

      return response.json(user);
    } catch (err) {
      throw new AppError(err);
    }
  }
}
