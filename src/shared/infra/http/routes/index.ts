import { Router } from 'express';
import UserRouter from '@modules/users/infra/http/routes/user.routes';
import SessionRouter from '@modules/users/infra/http/routes/sessions.routes';
import FollowerRouter from '@modules/followers/infra/http/routes/follower.routes';
import FollowingRouter from '@modules/followings/infra/http/routes/following.routes';
import RepositoryRouter from '@modules/repositories/infra/http/routes/repository.routes';
import RepositoryStarRouter from '@modules/repositoriesStars/infra/http/routes/repositoryStar.routes';

const routes = Router();

routes.use('/session', SessionRouter);
routes.use('/users', UserRouter);
routes.use('/followers', FollowerRouter);
routes.use('/followings', FollowingRouter);
routes.use('/repositories', RepositoryRouter);
routes.use('/stars', RepositoryStarRouter);

export default routes;
