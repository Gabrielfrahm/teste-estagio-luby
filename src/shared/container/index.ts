import { container } from 'tsyringe';

import './providers';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import ITokenRepository from '@modules/users/repositories/ITokenRepository';
import TokenRepository from '@modules/users/infra/typeorm/repositories/TokenRepository';

import IFollowerRepository from '@modules/followers/repositories/IFollowerRepository';
import FollowerRepository from '@modules/followers/infra/typeorm/repositories/FollowerRespository';

import IFollowingRepository from '@modules/followings/repositories/IFollowingRepository';
import FollowingRepository from '@modules/followings/infra/typeorm/repositories/FollowingRepository';

import IRepositoriesRepository from '@modules/repositories/repositories/IRepositoriesRepository';
import RepositoriesRepository from '@modules/repositories/infra/typeorm/repositories/RepositoriesRepository';

import IRepositoriesStarsRepository from '@modules/repositoriesStars/repositories/IRepositoriesStarsRepository';
import RepositoriesStarsRepository from '@modules/repositoriesStars/infra/typeorm/repositories/RepositoriesStarsRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<ITokenRepository>(
  'TokenRepository',
  TokenRepository,
);

container.registerSingleton<IFollowerRepository>(
  'FollowerRepository',
  FollowerRepository,
);

container.registerSingleton<IFollowingRepository>(
  'FollowingRepository',
  FollowingRepository,
);

container.registerSingleton<IRepositoriesRepository>(
  'RepositoriesRepository',
  RepositoriesRepository,
);

container.registerSingleton<IRepositoriesStarsRepository>(
  'RepositoriesStarsRepository',
  RepositoriesStarsRepository,
);
