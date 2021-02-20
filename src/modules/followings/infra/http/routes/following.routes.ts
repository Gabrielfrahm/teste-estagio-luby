import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import FollowingController from '../controller/FollowingController';

const FollowingRouter = Router();

const followingController = new FollowingController();

FollowingRouter.get('/:id', ensureAuthenticated, followingController.index);

FollowingRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().required(),
      following_id: Joi.string().required(),
    },
  }),
  followingController.create,
);

FollowingRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      following_id: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  followingController.update,
);

FollowingRouter.delete(
  '/:id',
  ensureAuthenticated,
  followingController.destroy,
);

export default FollowingRouter;
