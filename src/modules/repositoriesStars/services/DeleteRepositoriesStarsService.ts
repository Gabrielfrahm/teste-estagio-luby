import { inject, injectable } from 'tsyringe';
import IRepositoriesStarsRepository from '../repositories/IRepositoriesStarsRepository';

interface IRequestDTO {
  repository_id: string;
}

@injectable()
class DeleteRepositoriesStars {
  constructor(
    @inject('RepositoriesStarsRepository')
    private repositoriesStarsRepository: IRepositoriesStarsRepository,
  ) {}

  public async execute({ repository_id }: IRequestDTO): Promise<void> {
    await this.repositoriesStarsRepository.delete(repository_id);
  }
}

export default DeleteRepositoriesStars;
