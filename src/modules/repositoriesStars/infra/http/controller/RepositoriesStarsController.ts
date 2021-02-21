import CreateRepositoriesStars from '@modules/repositoriesStars/services/CreateRepositoriesStars';
import ShowRepositoriesStars from '@modules/repositoriesStars/services/ShowRepositoriesStars';
import DeleteRepositoriesStars from '@modules/repositoriesStars/services/DeleteRepositoriesStars';
// import UpdateRepositoryService from '@modules/repositories/services/UpdateRepositoryService';

import { Response, Request } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/error/AppError';

export default class FollowerController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.params.id;
      const { repository_id } = request.body;

      const createRepositoriesStars = container.resolve(
        CreateRepositoriesStars,
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

      const showRepositoriesStars = container.resolve(ShowRepositoriesStars);

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
        DeleteRepositoriesStars,
      );

      await deleteRepositoriesStars.execute({
        repository_id,
      });

      return response.status(201).json({ message: 'success for delete star' });
    } catch (err) {
      throw new AppError(err);
    }
  }

  // public async update(request: Request, response: Response): Promise<Response> {
  //   try {
  //     const repository_id = request.params.id;
  //     const { name, description, open } = request.body;

  //     const updateRepositoryService = container.resolve(
  //       UpdateRepositoryService,
  //     );

  //     const repository = await updateRepositoryService.execute({
  //       repository_id,
  //       name,
  //       description,
  //       open,
  //     });

  //     return response.status(201).json(repository);
  //   } catch (err) {
  //     throw new AppError(err);
  //   }
  // }
}
