import { Response, Request } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import AppError from '@shared/error/AppError';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email } = request.body;
      const authenticateUser = container.resolve(AuthenticateUserService);

      const { user, token } = await authenticateUser.execute({
        email,
      });

      return response.json({
        userWithoutPassword: user,
        token,
      });
    } catch (err) {
      throw new AppError(err);
    }
  }
}
