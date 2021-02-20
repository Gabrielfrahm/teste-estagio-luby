import { inject, injectable } from 'tsyringe';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/error/AppError';
import IFollowerRepository from '../repositories/IFollowerRepository';
import Follower from '../infra/typeorm/entities/Follower';

interface IRequestDTO {
  user_id: string;
  follower_id: string;
}

@injectable()
class UpdateFollowerService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('FollowerRepository')
    private followerRepository: IFollowerRepository,
  ) {}

  public async execute({
    user_id,
    follower_id,
  }: IRequestDTO): Promise<Follower> {
    const isUser = await this.userRepository.findById(user_id);

    if (!isUser) {
      throw new AppError('user not found');
    }

    const isUserFollower = await this.userRepository.findById(follower_id);

    if (!isUserFollower) {
      throw new AppError('user not found');
    }

    const follower = await this.followerRepository.findById(user_id);

    if (!follower) {
      throw new AppError('follower not exist');
    }

    follower.follower_id = follower_id;
    follower.user_id = user_id;

    return this.followerRepository.save(follower);
  }
}

export default UpdateFollowerService;
