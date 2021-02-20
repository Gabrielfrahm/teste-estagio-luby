import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import Follower from '../infra/typeorm/entities/Follower';
import IFollowerRepository from '../repositories/IFollowerRepository';

interface IRequestDTO {
  user_id: string;
}

interface IResponseDTO {
  follower: Follower[];
  count: number;
}

@injectable()
class ShowAllFollowerService {
  constructor(
    @inject('FollowerRepository')
    private followerRepository: IFollowerRepository,
  ) {}

  public async execute({ user_id }: IRequestDTO): Promise<IResponseDTO> {
    const follower = await this.followerRepository.findFollowers(user_id);

    if (!follower) {
      throw new AppError('no followers found');
    }

    const count = await this.followerRepository.count(user_id);

    if (!count) {
      throw new AppError('not count followers');
    }

    return { follower, count };
  }
}

export default ShowAllFollowerService;
