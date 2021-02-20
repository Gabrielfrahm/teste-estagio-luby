import ICreateFollowingDTO from '@modules/followings/dtos/ICreateFollowingDTO';
import IFollowingRepository from '@modules/followings/repositories/IFollowingRepository';
import { getRepository, Repository } from 'typeorm';
import Following from '../entities/Following';

class FollowingRepository implements IFollowingRepository {
  private ormRepository: Repository<Following>;

  constructor() {
    this.ormRepository = getRepository(Following);
  }

  public async findById(id: string): Promise<Following | undefined> {
    const following = await this.ormRepository.findOne(id);

    return following;
  }

  public async findFollowing(
    data: ICreateFollowingDTO,
  ): Promise<Following | undefined> {
    const following = await this.ormRepository.findOne({
      where: {
        user_id: data.user_id,
        following_id: data.following_id,
      },
    });

    return following;
  }

  public async findFollowings(
    user_id: string,
  ): Promise<Following[] | undefined> {
    const followings = await this.ormRepository.find({
      where: {
        user_id,
      },
      relations: ['following'],
    });

    return followings;
  }

  public async create(data: ICreateFollowingDTO): Promise<Following> {
    const following = this.ormRepository.create(data);

    await this.ormRepository.save(following);

    return following;
  }

  public async delete(following_id: string): Promise<void> {
    await this.ormRepository.delete({ following_id });
  }

  public async save(following: Following): Promise<Following> {
    return this.ormRepository.save(following);
  }

  public async count(user_id: string): Promise<number | undefined> {
    const count = await this.ormRepository.count({
      where: {
        user_id,
      },
    });

    return count;
  }
}

export default FollowingRepository;
