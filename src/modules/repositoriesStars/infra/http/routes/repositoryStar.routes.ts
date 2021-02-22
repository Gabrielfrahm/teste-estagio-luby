import { Router } from 'express';
// import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import RepositoriesStarsController from '../controller/RepositoriesStarsController';

const RepositoryStarRouter = Router();

const repositoriesStarsController = new RepositoriesStarsController();

RepositoryStarRouter.get(
  '/:id',
  ensureAuthenticated,
  repositoriesStarsController.index,
);

RepositoryStarRouter.post(
  '/:id',
  ensureAuthenticated,

  repositoriesStarsController.create,
);

RepositoryStarRouter.put(
  '/:id',

  ensureAuthenticated,
  repositoriesStarsController.update,
);

RepositoryStarRouter.delete(
  '/:id',
  ensureAuthenticated,
  repositoriesStarsController.destroy,
);

export default RepositoryStarRouter;
