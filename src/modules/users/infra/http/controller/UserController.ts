import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import ShowUserService from '@modules/users/services/ShowUserService';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showUser = container.resolve(ShowUserService);

    const user = await showUser.execute({ user_id });

    return response.json(user);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, location, username, bio } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      location,
      username,
      bio,
    });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, location, username, bio } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      location,
      username,
      bio,
    });

    return response.json(user);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const email = request.body;

    const deleteUserService = container.resolve(DeleteUserService);

    const user = await deleteUserService.execute(email);

    return response.json(user);
  }
}
