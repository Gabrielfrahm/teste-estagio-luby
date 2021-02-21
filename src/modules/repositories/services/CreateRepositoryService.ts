import IUserRepository from '@modules/users/repositories/IUserRepository';
import IRepositoriesRepository from '@modules/repositories/repositories/IRepositoriesRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/error/AppError';
import Repository from '../infra/typeorm/entities/Repository';

interface IRequestDTO {
  name: string;
  description: string;
  open: boolean;
  username: string;
}

@injectable()
class CreateRepositoryService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('RepositoriesRepository')
    private repositoriesRepository: IRepositoriesRepository,
  ) {}

  public async execute({
    name,
    description,
    open,
    username,
  }: IRequestDTO): Promise<Repository> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new AppError('not found user from provided username');
    }

    const slugName = `${user.username.split(' ').join('')}/${name
      .split(' ')
      .join('-')}`;

    const checkSlug = await this.repositoriesRepository.findRepository(
      slugName,
    );

    if (checkSlug) {
      throw new AppError('repository already existing');
    }

    const repository = await this.repositoriesRepository.create({
      name,
      description,
      open,
      slug: slugName,
    });

    return repository;
  }
}

export default CreateRepositoryService;
