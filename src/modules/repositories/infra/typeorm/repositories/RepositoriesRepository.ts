import ICreateRepositoryDTO from '@modules/repositories/dtos/ICreateRepositoryDTO';
import IRepositoriesRepository from '@modules/repositories/repositories/IRepositoriesRepository';
import { getRepository, Like, Repository as Repo } from 'typeorm';
import Repository from '../entities/Repository';

class RepositoriesRepository implements IRepositoriesRepository {
  private ormRepository: Repo<Repository>;

  constructor() {
    this.ormRepository = getRepository(Repository);
  }

  public async findById(id: string): Promise<Repository | undefined> {
    const following = await this.ormRepository.findOne(id);

    return following;
  }

  public async findRepository(slug: string): Promise<Repository | undefined> {
    const repository = await this.ormRepository.findOne({
      where: {
        slug,
      },
    });

    return repository;
  }

  public async findRepositories(
    slug: string,
  ): Promise<Repository[] | undefined> {
    const repositories = await this.ormRepository.find({
      where: {
        slug,
      },
    });

    return repositories;
  }

  public async create(data: ICreateRepositoryDTO): Promise<Repository> {
    const repository = this.ormRepository.create(data);

    await this.ormRepository.save(repository);

    return repository;
  }

  public async delete(repository_id: string): Promise<void> {
    await this.ormRepository.delete({ id: repository_id });
  }

  public async save(repository: Repository): Promise<Repository> {
    return this.ormRepository.save(repository);
  }

  public async count(username: string): Promise<number | undefined> {
    const count = await this.ormRepository.count({
      where: {
        slug: Like(`%${username}%`),
      },
    });

    return count;
  }

  public async findRepositoryByUsername(
    username: string,
  ): Promise<Repository[] | undefined> {
    const repository = await this.ormRepository.find({
      where: { slug: Like(`%${username}%`) },
    });
    return repository;
  }
}

export default RepositoriesRepository;
