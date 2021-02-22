import ICreateRepositoriesStarsDTO from '../dtos/ICreateRepositoriesStarsDTO';
import RepositoryStar from '../infra/typeorm/entities/RepositoryStar';

export default interface IRepositoriesStarsRepository {
  findById(repositories_stars_id: string): Promise<RepositoryStar | undefined>;
  findByRepoId(
    repositories_stars_id: string,
  ): Promise<RepositoryStar | undefined>;
  findRepoStar(
    data: ICreateRepositoriesStarsDTO,
  ): Promise<RepositoryStar | undefined>;
  findStar(repository_id: string): Promise<number | undefined>;
  create(data: ICreateRepositoriesStarsDTO): Promise<RepositoryStar>;
  save(repositoryStar: RepositoryStar): Promise<RepositoryStar>;
  delete(repositories_stars_id: string): Promise<void>;
}
