import { Router } from 'express';
import UserRouter from '@modules/users/infra/http/routes/user.routes';

const routes = Router();

routes.use('/users', UserRouter);

export default routes;
