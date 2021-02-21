import IUserRepository from '@modules/users/repositories/IUserRepository';
import IRepositoriesRepository from '@modules/repositories/repositories/IRepositoriesRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/error/AppError';
import Repository from '../infra/typeorm/entities/Repository';

interface IRequestDTO {
  repository_id: string;
  name: string;
  description: string;
  open: boolean;
}

@injectable()
class UpdateRepositoryService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('RepositoriesRepository')
    private repositoriesRepository: IRepositoriesRepository,
  ) {}

  public async execute({
    repository_id,
    name,
    description,
    open,
  }: IRequestDTO): Promise<Repository> {
    const checkRepo = await this.repositoriesRepository.findById(repository_id);

    if (!checkRepo) {
      throw new AppError('repository not found');
    }

    const splitSlug = checkRepo.slug.split('/');
    const newSlug = splitSlug[1].replace(splitSlug[1], name);
    const slugName = `${splitSlug[0]}/${newSlug.split(' ').join('-')}`;

    const checkSlug = await this.repositoriesRepository.findRepository(
      slugName,
    );

    if (checkSlug) {
      throw new AppError('repository already existing');
    }

    checkRepo.name = name;
    checkRepo.description = description;
    checkRepo.open = open;
    checkRepo.slug = slugName;

    this.repositoriesRepository.save(checkRepo);

    return checkRepo;
  }
}

export default UpdateRepositoryService;
