import { inject, injectable } from 'tsyringe';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/error/AppError';
import IFollowingRepository from '../repositories/IFollowingRepository';
import Following from '../infra/typeorm/entities/Following';

interface IRequestDTO {
  user_id: string;
  following_id: string;
}

@injectable()
class UpdateFollowingService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('FollowingRepository')
    private followingRepository: IFollowingRepository,
  ) {}

  public async execute({
    user_id,
    following_id,
  }: IRequestDTO): Promise<Following> {
    const isUser = await this.userRepository.findById(user_id);

    if (!isUser) {
      throw new AppError('user not found');
    }

    const isUserFollowing = await this.userRepository.findById(following_id);

    if (!isUserFollowing) {
      throw new AppError('user not found');
    }

    const following = await this.followingRepository.findById(user_id);

    if (!following) {
      throw new AppError('following not exist');
    }

    following.following_id = following_id;
    following.user_id = user_id;

    return this.followingRepository.save(following);
  }
}

export default UpdateFollowingService;
