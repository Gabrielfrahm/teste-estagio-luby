import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import IFollowerRepository from '../repositories/IFollowerRepository';

interface IRequestDTO {
  follower_id: string;
}

@injectable()
class DeleteFollowerService {
  constructor(
    @inject('FollowerRepository')
    private followerRepository: IFollowerRepository,
  ) {}

  public async execute({
    follower_id,
  }: IRequestDTO): Promise<void | undefined> {
    const follower = await this.followerRepository.findById(follower_id);

    if (!follower) {
      throw new AppError('no followers found');
    }

    await this.followerRepository.delete(follower.follower_id);
  }
}

export default DeleteFollowerService;
