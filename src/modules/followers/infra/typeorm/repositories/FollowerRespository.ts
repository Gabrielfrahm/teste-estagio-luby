import ICreateFollowerDTO from '@modules/followers/dtos/ICreateFollowerDTO';
import IFollowerRepository from '@modules/followers/repositories/IFollowerRepository';
import { getRepository, Repository } from 'typeorm';
import Follower from '../entities/Follower';

class FollowerRepository implements IFollowerRepository {
  private ormRepository: Repository<Follower>;

  constructor() {
    this.ormRepository = getRepository(Follower);
  }

  public async findById(id: string): Promise<Follower | undefined> {
    const follower = await this.ormRepository.findOne(id);

    return follower;
  }

  public async findFollower(
    data: ICreateFollowerDTO,
  ): Promise<Follower | undefined> {
    const follower = await this.ormRepository.findOne({
      where: {
        user_id: data.user_id,
        follower_id: data.follower_id,
      },
    });

    return follower;
  }

  public async findFollowers(user_id: string): Promise<Follower[] | undefined> {
    const followers = await this.ormRepository.find({
      where: {
        user_id,
      },
      relations: ['follower'],
    });

    return followers;
  }

  public async create(data: ICreateFollowerDTO): Promise<Follower> {
    const follower = this.ormRepository.create(data);

    await this.ormRepository.save(follower);

    return follower;
  }

  public async delete(follower_id: string): Promise<void> {
    await this.ormRepository.delete({ follower_id });
  }

  public async save(follower: Follower): Promise<Follower> {
    return this.ormRepository.save(follower);
  }

  public async count(user_id: string): Promise<number | undefined> {
    const number = await this.ormRepository.count({
      where: { user_id },
    });

    return number;
  }
}

export default FollowerRepository;
