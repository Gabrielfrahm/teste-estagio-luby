import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import FollowerController from '../controller/FollowerController';

const FollowerRouter = Router();

const followerController = new FollowerController();

// UsersRouter.get('/', ensureAuthenticated, followerController.index);

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

// UsersRouter.put(
//   '/',
//   celebrate({
//     [Segments.BODY]: {
//       name: Joi.string().required(),
//       email: Joi.string().required(),
//       location: Joi.string().required(),
//       username: Joi.string().required(),
//       bio: Joi.string().required(),
//     },
//   }),
//   ensureAuthenticated,
//   usersController.update,
// );

// UsersRouter.delete('/', ensureAuthenticated, usersController.delete);

export default FollowerRouter;
