import CreateFollowingService from '@modules/followings/services/CreateFollowingService';
import ShowAllFollowingService from '@modules/followings/services/ShowAllFollowingService';
import DeleteFollowingService from '@modules/followings/services/DeleteFollowingService';
import UpdateFollowingService from '@modules/followings/services/UpdateFollowingService';

import { Response, Request } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/error/AppError';

export default class FollowerController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { user_id, following_id } = request.body;

      const createFollowingService = container.resolve(CreateFollowingService);

      const following = await createFollowingService.execute({
        user_id,
        following_id,
      });

      return response.status(201).json(following);
    } catch (err) {
      throw new AppError(err);
    }
  }

  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.params.id;

      const showAllFollowing = container.resolve(ShowAllFollowingService);

      const following = await showAllFollowing.execute({
        user_id,
      });

      return response.status(201).json(following);
    } catch (err) {
      throw new AppError(err);
    }
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { following_id } = request.params;

      const deleteFollowingService = container.resolve(DeleteFollowingService);

      const follower = await deleteFollowingService.execute({
        following_id,
      });

      return response.status(201).json(follower);
    } catch (err) {
      throw new AppError(err);
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { user_id } = request.params;
      const { following_id } = request.body;

      const updateFollowingService = container.resolve(UpdateFollowingService);

      const follower = await updateFollowingService.execute({
        following_id,
        user_id,
      });

      return response.status(201).json(follower);
    } catch (err) {
      throw new AppError(err);
    }
  }
}
