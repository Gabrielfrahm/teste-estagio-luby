import IUserRepository from '@modules/users/repositories/IUserRepository';
import IRepositoriesRepository from '@modules/repositories/repositories/IRepositoriesRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/error/AppError';
import IRepositoriesStarsRepository from '@modules/repositoriesStars/repositories/IRepositoriesStarsRepository';
import Repository from '../infra/typeorm/entities/Repository';

interface IRequestDTO {
  user_id: string;
}

interface IResponseDTO {
  repositories: Repository[];
  count: number;
}

@injectable()
class ShowRepositoryService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('RepositoriesRepository')
    private repositoriesRepository: IRepositoriesRepository,

    @inject('RepositoriesStarsRepository')
    private repositoriesStarsRepository: IRepositoriesStarsRepository,
  ) {}

  public async execute({ user_id }: IRequestDTO): Promise<IResponseDTO> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('error');
    }

    user.username = `${user.username.split(' ').join('')}`;

    const repositories = await this.repositoriesRepository.findRepositoryByUsername(
      user.username,
    );

    if (!repositories) {
      throw new AppError('did not find any repository');
    }

    const count = await this.repositoriesRepository.count(user.username);

    if (!count) {
      throw new AppError('not found');
    }

    return { repositories, count };
  }
}

export default ShowRepositoryService;
