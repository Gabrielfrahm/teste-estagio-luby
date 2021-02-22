import { inject, injectable } from 'tsyringe';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IRepositoriesRepository from '@modules/repositories/repositories/IRepositoriesRepository';
import AppError from '@shared/error/AppError';
import IRepositoriesStarsRepository from '../repositories/IRepositoriesStarsRepository';
import RepositoryStar from '../infra/typeorm/entities/RepositoryStar';

interface IRequestDTO {
  repository_id: string;
}

interface IResponseDTO {
  repoStar: RepositoryStar;
  stars: number;
}

@injectable()
class ShowRepositoriesStarsService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('RepositoriesRepository')
    private repositoriesRepository: IRepositoriesRepository,

    @inject('RepositoriesStarsRepository')
    private repositoriesStarsRepository: IRepositoriesStarsRepository,
  ) {}

  public async execute({ repository_id }: IRequestDTO): Promise<IResponseDTO> {
    const repoStar = await this.repositoriesStarsRepository.findById(
      repository_id,
    );

    if (!repoStar) {
      throw new AppError('repository not found');
    }

    const stars = await this.repositoriesStarsRepository.findStar(
      repository_id,
    );

    if (!stars) {
      throw new AppError('this repo dont have stars');
    }

    return { repoStar, stars };
  }
}

export default ShowRepositoriesStarsService;
