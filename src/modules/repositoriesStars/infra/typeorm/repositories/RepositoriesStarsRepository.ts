import ICreateRepositoriesStarsDTO from '@modules/repositoriesStars/dtos/ICreateRepositoriesStarsDTO';
import IRepositoriesStarsRepository from '@modules/repositoriesStars/repositories/IRepositoriesStarsRepository';
import { getRepository, Repository } from 'typeorm';
import RepositoryStar from '../entities/RepositoryStar';

class RepositoriesStarsRepository implements IRepositoriesStarsRepository {
  private ormRepository: Repository<RepositoryStar>;

  constructor() {
    this.ormRepository = getRepository(RepositoryStar);
  }

  public async findById(
    repositories_stars_id: string,
  ): Promise<RepositoryStar | undefined> {
    const user = this.ormRepository.findOne({
      where: {
        repository_id: repositories_stars_id,
      },
    });

    return user;
  }

  public async findRepoStar({
    user_id,
    repository_id,
  }: ICreateRepositoriesStarsDTO): Promise<RepositoryStar | undefined> {
    const repoStars = await this.ormRepository.findOne({
      where: { user_id, repository_id },
    });

    return repoStars;
  }

  public async findStar(repository_id: string): Promise<number | undefined> {
    const stars = await this.ormRepository.count({
      where: {
        repository_id,
      },
    });
    return stars;
  }

  public async create(
    data: ICreateRepositoriesStarsDTO,
  ): Promise<RepositoryStar> {
    const repoStars = this.ormRepository.create(data);

    await this.ormRepository.save(repoStars);

    return repoStars;
  }

  public async delete(repositories_stars_id: string): Promise<void> {
    await this.ormRepository.delete({ id: repositories_stars_id });
  }

  public async save(
    repositoriesStars: RepositoryStar,
  ): Promise<RepositoryStar> {
    return this.ormRepository.save(repositoriesStars);
  }
}

export default RepositoriesStarsRepository;
