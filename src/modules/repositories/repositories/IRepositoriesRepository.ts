import Repository from '@modules/repositories/infra/typeorm/entities/Repository';
import ICreateRepositoryDTO from '../dtos/ICreateRepositoryDTO';

export default interface IRepositoriesRepository {
  findById(id: string): Promise<Repository | undefined>;
  findRepositories(slug: string): Promise<Repository[] | undefined>;
  findRepository(slug: string): Promise<Repository | undefined>;
  findRepositoryByUsername(username: string): Promise<Repository[] | undefined>;
  create(data: ICreateRepositoryDTO): Promise<Repository>;
  delete(repository_id: string): Promise<void>;
  save(repository: Repository): Promise<Repository>;
  count(slug: string): Promise<number | undefined>;
}
