import { inject, injectable } from 'tsyringe';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IRepositoriesRepository from '@modules/repositories/repositories/IRepositoriesRepository';
import AppError from '@shared/error/AppError';
import IRepositoriesStarsRepository from '../repositories/IRepositoriesStarsRepository';
import RepositoryStar from '../infra/typeorm/entities/RepositoryStar';

interface IRequestDTO {
  user_id: string;
  repository_id: string;
}

@injectable()
class CreateRepositoryService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('RepositoriesRepository')
    private repositoriesRepository: IRepositoriesRepository,

    @inject('RepositoriesStarsRepository')
    private repositoriesStarsRepository: IRepositoriesStarsRepository,
  ) {}

  public async execute({
    user_id,
    repository_id,
  }: IRequestDTO): Promise<RepositoryStar> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('user not found');
    }

    const repo = await this.repositoriesRepository.findById(repository_id);

    if (!repo) {
      throw new AppError('repository not found');
    }

    const checkStar = await this.repositoriesStarsRepository.findRepoStar({
      user_id,
      repository_id,
    });

    if (checkStar) {
      throw new AppError('star this repo already existis');
    }

    console.log(user_id, repository_id);

    const stars = await this.repositoriesStarsRepository.create({
      user_id,
      repository_id,
    });

    return stars;
  }
}

export default CreateRepositoryService;
