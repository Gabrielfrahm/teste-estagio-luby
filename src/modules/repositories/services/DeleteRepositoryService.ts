import IUserRepository from '@modules/users/repositories/IUserRepository';
import IRepositoriesRepository from '@modules/repositories/repositories/IRepositoriesRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/error/AppError';

interface IRequestDTO {
  repository_id: string;
}

@injectable()
class DeleteRepositoryService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('RepositoriesRepository')
    private repositoriesRepository: IRepositoriesRepository,
  ) {}

  public async execute({ repository_id }: IRequestDTO): Promise<void> {
    const repository = await this.repositoriesRepository.findById(
      repository_id,
    );

    if (!repository) {
      throw new AppError('repository not existing');
    }

    await this.repositoriesRepository.delete(repository_id);
  }
}

export default DeleteRepositoryService;
