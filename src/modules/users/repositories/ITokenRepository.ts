import Token from '../infra/typeorm/entities/Token';

export default interface ITokenRepository {
  create(user_id: string): Promise<void>;
}
