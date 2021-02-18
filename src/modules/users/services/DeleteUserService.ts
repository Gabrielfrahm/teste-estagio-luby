import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import IUserRepository from '../repositories/IUserRepository';

interface IRequestDTO {
  email: string;
}

@injectable()
class DeleteUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ email }: IRequestDTO): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("user don't existing");
    }

    await this.userRepository.delete(user.id);
  }
}

export default DeleteUserService;
