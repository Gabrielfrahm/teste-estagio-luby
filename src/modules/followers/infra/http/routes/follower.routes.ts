import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import FollowerController from '../controller/FollowerController';

const FollowerRouter = Router();

const followerController = new FollowerController();

FollowerRouter.get('/:id', ensureAuthenticated, followerController.index);

FollowerRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().required(),
      follower_id: Joi.string().required(),
    },
  }),
  followerController.create,
);

FollowerRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      follower_id: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  followerController.update,
);

FollowerRouter.delete('/:id', ensureAuthenticated, followerController.destroy);

export default FollowerRouter;
