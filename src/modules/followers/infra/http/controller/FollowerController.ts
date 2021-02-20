import CreateFollowerService from '@modules/followers/services/CreateFollowerService';
import ShowAllFollowerService from '@modules/followers/services/ShowAllFollowerService';
import DeleteFollowerService from '@modules/followers/services/DeleteFollowerService';
import UpdateFollowerService from '@modules/followers/services/UpadateFollowerService';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

export default class FollowerController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { user_id, follower_id } = request.body;

    const createFollower = container.resolve(CreateFollowerService);

    const follower = await createFollower.execute({
      user_id,
      follower_id,
    });

    return response.status(201).json(follower);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.params.id;

    const showAllFollower = container.resolve(ShowAllFollowerService);

    const follower = await showAllFollower.execute({
      user_id,
    });

    return response.status(201).json(follower);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { follower_id } = request.params;

    const deleteFollowerService = container.resolve(DeleteFollowerService);

    const follower = await deleteFollowerService.execute({
      follower_id,
    });

    return response.status(201).json(follower);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const { follower_id } = request.body;

    const updateFollowerService = container.resolve(UpdateFollowerService);

    const follower = await updateFollowerService.execute({
      follower_id,
      user_id,
    });

    return response.status(201).json(follower);
  }
}
