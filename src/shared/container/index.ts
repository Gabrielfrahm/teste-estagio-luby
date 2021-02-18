import { container } from 'tsyringe';

import './providers';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import ITokenRepository from '@modules/users/repositories/ITokenRepository';
import TokenRepository from '@modules/users/infra/typeorm/repositories/TokenRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<ITokenRepository>(
  'TokenRepository',
  TokenRepository,
);
