import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import UsersController from '../controller/UserController';
import UserAvatarController from '../controller/UserAvatarController';

const UsersRouter = Router();
const upload = multer(uploadConfig.multer);

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

UsersRouter.get('/', ensureAuthenticated, usersController.index);

UsersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      location: Joi.string().required(),
      username: Joi.string().required(),
      bio: Joi.string().required(),
    },
  }),
  usersController.create,
);

UsersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

UsersRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      location: Joi.string().required(),
      username: Joi.string().required(),
      bio: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  usersController.update,
);

UsersRouter.delete('/', ensureAuthenticated, usersController.delete);

export default UsersRouter;
