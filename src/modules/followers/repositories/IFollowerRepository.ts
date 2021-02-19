import ICreateFollowerDTO from '../dtos/ICreateFollowerDTO';
import Follower from '../infra/typeorm/entities/Follower';

export default interface IFollowerRepository {
  findById(id: string): Promise<Follower | undefined>;
  findFollowers(): Promise<Follower[] | undefined>;
  findFollowerByUserId(user_id: string): Promise<Follower[] | undefined>;
  findFollower(data: ICreateFollowerDTO): Promise<Follower | undefined>;
  create(data: ICreateFollowerDTO): Promise<Follower>;
  delete(follower_id: string): Promise<void>;
  save(follower: Follower): Promise<Follower>;
}
