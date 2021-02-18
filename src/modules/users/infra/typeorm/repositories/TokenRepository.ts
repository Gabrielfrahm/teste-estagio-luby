import ITokenRepository from '@modules/users/repositories/ITokenRepository';
import { getRepository, Repository } from 'typeorm';
import Token from '../entities/Token';

class TokenRepository implements ITokenRepository {
  private ormRepository: Repository<Token>;

  constructor() {
    this.ormRepository = getRepository(Token);
  }

  public async create(user_id: string): Promise<void> {
    const tokens = this.ormRepository.create({ user_id });

    await this.ormRepository.save(tokens);
  }
}

export default TokenRepository;
