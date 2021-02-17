import CreateUserService from '@modules/users/services/CreateUserService';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, location, avatar, username, bio } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      location,
      avatar,
      username,
      bio,
    });

    return response.json(user);
  }
}
