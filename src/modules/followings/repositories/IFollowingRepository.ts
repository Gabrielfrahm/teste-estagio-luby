import ICreateFollowingDTO from '../dtos/ICreateFollowingDTO';
import Following from '../infra/typeorm/entities/Following';

export default interface IFollowingRepository {
  findById(id: string): Promise<Following | undefined>;
  findFollowings(user_id: string): Promise<Following[] | undefined>;
  findFollowing(data: ICreateFollowingDTO): Promise<Following | undefined>;
  create(data: ICreateFollowingDTO): Promise<Following>;
  delete(following_id: string): Promise<void>;
  save(following: Following): Promise<Following>;
  count(user_id: string): Promise<number | undefined>;
}
