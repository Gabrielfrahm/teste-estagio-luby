import { injectable, inject } from 'tsyringe';

import AppError from '@shared/error/AppError';

import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';

interface IRequestDTO {
  user_id: string;
  name: string;
  email: string;
  location: string;
  username: string;
  bio: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    location,
    username,
    bio,
  }: IRequestDTO): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('user not found.');
    }

    const userWithUpdateEmail = await this.userRepository.findByEmail(email);

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user_id) {
      throw new AppError('E-mail already in use.');
    }

    user.email = email;
    user.name = name;
    user.location = location;
    user.username = username;
    user.bio = bio;

    return this.userRepository.save(user);
  }
}

export default UpdateProfileService;
