import { Router } from 'express';
// import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import RepositoryController from '../controller/RepositoryController';

const RepositoryRouter = Router();

const repositoryController = new RepositoryController();

RepositoryRouter.get('/:id', ensureAuthenticated, repositoryController.index);

RepositoryRouter.post(
  '/',
  ensureAuthenticated,

  repositoryController.create,
);

RepositoryRouter.put(
  '/:id',

  ensureAuthenticated,
  repositoryController.update,
);

RepositoryRouter.delete(
  '/:id',
  ensureAuthenticated,
  repositoryController.destroy,
);

export default RepositoryRouter;
