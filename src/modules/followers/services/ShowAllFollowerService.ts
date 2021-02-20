import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import Follower from '../infra/typeorm/entities/Follower';
import IFollowerRepository from '../repositories/IFollowerRepository';

interface IRequestDTO {
  user_id: string;
}

@injectable()
class ShowAllFollowerService {
  constructor(
    @inject('FollowerRepository')
    private followerRepository: IFollowerRepository,
  ) {}

  public async execute({ user_id }: IRequestDTO): Promise<Follower[]> {
    const follower = await this.followerRepository.findFollowers(user_id);

    if (!follower) {
      throw new AppError('no followers found');
    }

    return follower;
  }
}

export default ShowAllFollowerService;
