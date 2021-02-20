import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import IFollowingRepository from '../repositories/IFollowingRepository';

interface IRequestDTO {
  following_id: string;
}

@injectable()
class DeleteFollowingService {
  constructor(
    @inject('FollowingRepository')
    private followingRepository: IFollowingRepository,
  ) {}

  public async execute({
    following_id,
  }: IRequestDTO): Promise<void | undefined> {
    const following = await this.followingRepository.findById(following_id);

    if (!following) {
      throw new AppError('no followers found');
    }

    await this.followingRepository.delete(following.following_id);
  }
}

export default DeleteFollowingService;
