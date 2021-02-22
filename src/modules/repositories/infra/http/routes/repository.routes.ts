import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import RepositoryController from '../controller/RepositoryController';

const RepositoryRouter = Router();

const repositoryController = new RepositoryController();

RepositoryRouter.get('/:id', ensureAuthenticated, repositoryController.index);

RepositoryRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      open: Joi.boolean().required(),
      username: Joi.string().required(),
    },
  }),
  ensureAuthenticated,

  repositoryController.create,
);

RepositoryRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      open: Joi.boolean().required(),
    },
  }),
  ensureAuthenticated,
  repositoryController.update,
);

RepositoryRouter.delete(
  '/:id',
  ensureAuthenticated,
  repositoryController.destroy,
);

export default RepositoryRouter;
