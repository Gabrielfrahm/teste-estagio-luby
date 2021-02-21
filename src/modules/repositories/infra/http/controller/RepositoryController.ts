import CreateRepositoryService from '@modules/repositories/services/CreateRepositoryService';
import ShowRepositoryService from '@modules/repositories/services/ShowRepositoryService';
import DeleteRepositoryService from '@modules/repositories/services/DeleteRepositoryService';
import UpdateRepositoryService from '@modules/repositories/services/UpdateRepositoryService';

import { classToClass } from 'class-transformer';

import { Response, Request } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/error/AppError';

export default class FollowerController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description, open, username } = request.body;

      const createRepositoryService = container.resolve(
        CreateRepositoryService,
      );

      const repository = await createRepositoryService.execute({
        name,
        description,
        open,
        username,
      });

      return response.status(201).json(repository);
    } catch (err) {
      throw new AppError(err);
    }
  }

  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.params.id;

      const showRepositoryService = container.resolve(ShowRepositoryService);

      const repository = await showRepositoryService.execute({
        user_id,
      });

      return response.status(201).json(classToClass(repository));
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

      const deleteRepositoryService = container.resolve(
        DeleteRepositoryService,
      );

      await deleteRepositoryService.execute({
        repository_id,
      });

      return response
        .status(201)
        .json({ message: 'success for delete repository' });
    } catch (err) {
      throw new AppError(err);
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const repository_id = request.params.id;
      const { name, description, open } = request.body;

      const updateRepositoryService = container.resolve(
        UpdateRepositoryService,
      );

      const repository = await updateRepositoryService.execute({
        repository_id,
        name,
        description,
        open,
      });

      return response.status(201).json(repository);
    } catch (err) {
      throw new AppError(err);
    }
  }
}
