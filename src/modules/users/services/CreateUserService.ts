import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';

interface IRequestDTO {
  name: string;
  email: string;
  location: string;
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
    username,
    bio,
  }: IRequestDTO): Promise<User | undefined> {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('User Already existing');
    }

    const checkUsername = await this.userRepository.findByUsername(username);

    if (checkUsername) {
      throw new AppError('username already existis');
    }

    const user = await this.userRepository.create({
      name,
      email,
      location,
      username,
      bio,
    });

    return user;
  }
}

export default CreateUserService;
