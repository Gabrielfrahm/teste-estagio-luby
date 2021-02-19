import { Router } from 'express';
import UserRouter from '@modules/users/infra/http/routes/user.routes';
import SessionRouter from '@modules/users/infra/http/routes/sessions.routes';
import FollowerRouter from '@modules/followers/infra/http/routes/follower.routes';

const routes = Router();

routes.use('/session', SessionRouter);
routes.use('/users', UserRouter);
routes.use('/followers', FollowerRouter);

export default routes;
