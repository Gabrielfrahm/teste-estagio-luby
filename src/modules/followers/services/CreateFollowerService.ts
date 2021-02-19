import IUserRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import Follower from '../infra/typeorm/entities/Follower';
import IFollowerRepository from '../repositories/IFollowerRepository';

interface IRequestDTO {
  user_id: string;
  follower_id: string;
}

@injectable()
class CreateFollowerService {
  constructor(
    @inject('FollowerRepository')
    private followerRepository: IFollowerRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    user_id,
    follower_id,
  }: IRequestDTO): Promise<Follower> {
    const user = await this.userRepository.findById(user_id);
    const follower = await this.userRepository.findById(follower_id);

    if (!user || !follower) {
      throw new AppError('past ids do not match');
    }

    const checkUserFollowerMatch = await this.followerRepository.findFollower({
      user_id,
      follower_id,
    });

    if (checkUserFollowerMatch) {
      throw new AppError('relationship already exists');
    }

    const createFollower = await this.followerRepository.create({
      follower_id,
      user_id,
    });

    return createFollower;
  }
}

export default CreateFollowerService;
