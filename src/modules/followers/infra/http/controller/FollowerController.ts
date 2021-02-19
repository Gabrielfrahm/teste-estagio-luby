import CreateFollowerService from '@modules/followers/services/CreateFollowerService';
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
}
