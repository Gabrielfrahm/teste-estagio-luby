import IUserRepository from '@modules/users/repositories/IUserRepository';
import IFollowingRepository from '@modules/followings/repositories/IFollowingRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/error/AppError';
import Following from '../infra/typeorm/entities/Following';

interface IRequestDTO {
  user_id: string;
  following_id: string;
}

@injectable()
class CreateFollowingService {
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
    const user = await this.userRepository.findById(user_id);
    const following = await this.userRepository.findById(following_id);

    if (!user || !following) {
      throw new AppError('past ids do not match');
    }

    const checkUserFollowerMatch = await this.followingRepository.findFollowing(
      {
        user_id,
        following_id,
      },
    );

    if (checkUserFollowerMatch) {
      throw new AppError('relationship already exists');
    }

    if (user_id === following_id) {
      throw new AppError("you can't following yourself");
    }

    const createFollower = await this.followingRepository.create({
      following_id,
      user_id,
    });

    return createFollower;
  }
}

export default CreateFollowingService;
