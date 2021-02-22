import { inject, injectable } from 'tsyringe';
import AppError from '@shared/error/AppError';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IRepositoriesRepository from '@modules/repositories/repositories/IRepositoriesRepository';
import IRepositoriesStarsRepository from '../repositories/IRepositoriesStarsRepository';
import RepositoryStar from '../infra/typeorm/entities/RepositoryStar';

interface IRequestDTO {
  user_id: string;
  repository_id: string;
  repositories_stars_id: string;
}

@injectable()
class CreateRepositoryService {
  constructor(
    @inject('RepositoriesStarsRepository')
    private repositoriesStarsRepository: IRepositoriesStarsRepository,

    @inject('RepositoriesRepository')
    private repositoriesRepository: IRepositoriesRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    repository_id,
    user_id,
    repositories_stars_id,
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

    const repoStar = await this.repositoriesStarsRepository.findByRepoId(
      repositories_stars_id,
    );

    if (!repoStar) {
      throw new AppError('star for reto not found');
    }

    repoStar.user_id = user_id;
    repoStar.repository_id = repository_id;

    return this.repositoriesStarsRepository.save(repoStar);
  }
}

export default CreateRepositoryService;
