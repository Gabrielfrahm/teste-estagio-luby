import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import Following from '../infra/typeorm/entities/Following';
import IFollowingRepository from '../repositories/IFollowingRepository';

interface IRequestDTO {
  user_id: string;
}

interface IResponseDTO {
  followings: Following[];
  count: number;
}

@injectable()
class ShowAllFollowingService {
  constructor(
    @inject('FollowingRepository')
    private followingRepository: IFollowingRepository,
  ) {}

  public async execute({ user_id }: IRequestDTO): Promise<IResponseDTO> {
    const followings = await this.followingRepository.findFollowings(user_id);

    if (!followings) {
      throw new AppError('no followings found');
    }

    const count = await this.followingRepository.count(user_id);

    if (!count) {
      throw new AppError('not count followings');
    }

    return { followings, count };
  }
}

export default ShowAllFollowingService;
