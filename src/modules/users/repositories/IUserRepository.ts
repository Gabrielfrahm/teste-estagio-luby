import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUserRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
  delete(email: string): Promise<void>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
