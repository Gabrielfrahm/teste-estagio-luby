import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';

interface IRequestDTO {
  name: string;
  email: string;
  location: string;
  avatar: string;
  username: string;
  bio: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    name,
    email,
    location,
    avatar,
    username,
    bio,
  }: IRequestDTO): Promise<User | undefined> {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('User Already existing');
    }

    const user = await this.userRepository.create({
      name,
      email,
      location,
      avatar,
      username,
      bio,
    });

    return user;
  }
}

export default CreateUserService;
