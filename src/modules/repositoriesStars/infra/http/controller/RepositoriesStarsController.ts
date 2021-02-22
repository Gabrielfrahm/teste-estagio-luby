import CreateRepositoriesStarsService from '@modules/repositoriesStars/services/CreateRepositoriesStarsService';
import ShowRepositoriesStarsService from '@modules/repositoriesStars/services/ShowRepositoriesStarsService';
import DeleteRepositoriesStarsService from '@modules/repositoriesStars/services/DeleteRepositoriesStarsService';
import UpdateRepositoriesStarsService from '@modules/repositoriesStars/services/UpdateRepositoriesStarsService';

import { Response, Request } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/error/AppError';

export default class FollowerController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.params.id;
      const { repository_id } = request.body;

      const createRepositoriesStars = container.resolve(
        CreateRepositoriesStarsService,
      );

      const stars = await createRepositoriesStars.execute({
        user_id,
        repository_id,
      });

      return response.status(201).json(stars);
    } catch (err) {
      throw new AppError(err);
    }
  }

  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const repository_id = request.params.id;

      const showRepositoriesStars = container.resolve(
        ShowRepositoriesStarsService,
      );

      const repository = await showRepositoriesStars.execute({
        repository_id,
      });

      return response.status(201).json(repository);
    } catch (err) {
      throw new AppError(err);
    }
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const repository_id = request.params.id;

      const deleteRepositoriesStars = container.resolve(
        DeleteRepositoriesStarsService,
      );

      await deleteRepositoriesStars.execute({
        repository_id,
      });

      return response.status(201).json({ message: 'success for delete star' });
    } catch (err) {
      throw new AppError(err);
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const repositories_stars_id = request.params.id;
      const { user_id, repository_id } = request.body;

      const updateRepositoryStarService = container.resolve(
        UpdateRepositoriesStarsService,
      );

      const repositoriesStars = await updateRepositoryStarService.execute({
        repository_id,
        repositories_stars_id,
        user_id,
      });

      return response.status(201).json(repositoriesStars);
    } catch (err) {
      throw new AppError(err);
    }
  }
}
