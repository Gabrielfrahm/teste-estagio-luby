import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import authConfig from '@config/auth';
import AppError from '@shared/error/AppError';

import IUserRepository from '../repositories/IUserRepository';
import User from '../infra/typeorm/entities/User';
import ITokenRepository from '../repositories/ITokenRepository';

interface IRequestDTO {
  email: string;
}
interface IResponseDTO {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('TokenRepository')
    private tokenRepository: ITokenRepository,
  ) {}

  public async execute({ email }: IRequestDTO): Promise<IResponseDTO> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    await this.tokenRepository.create(user.id);

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
