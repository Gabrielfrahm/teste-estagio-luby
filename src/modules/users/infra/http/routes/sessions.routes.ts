import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SessionController from '../controller/SessionsController';

const SessionsRouter = Router();
const sessionController = new SessionController();

SessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
    },
  }),
  sessionController.create,
);

export default SessionsRouter;
