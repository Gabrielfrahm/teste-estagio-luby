import { Router } from 'express';
import UserRouter from '@modules/users/infra/http/routes/user.routes';
import SessionRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/session', SessionRouter);
routes.use('/users', UserRouter);

export default routes;
