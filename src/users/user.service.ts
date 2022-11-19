import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORIES } from 'src/constants/constants';
import { User } from '../models/user.model';
import { UserInterface } from '../interfaces/user.interface';
import { hashPassword } from 'src/util/helpers';

@Injectable()
export class UserService {
  constructor(
    @Inject(REPOSITORIES.USERS_REPOSITORY)
    private usersRepository: typeof User,
  ) {}

  async registerUser(user: UserInterface): Promise<User> {
    try {
      user.password = hashPassword(user.password);
      const newUser = await this.usersRepository.create({ ...user });
      return newUser;
    } catch (err) {
      console.error();
    }
  }

  findAll(): Promise<User[]> {
    const users = this.usersRepository.findAll();
    return users;
  }

  async findOne(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({
      where: { email },
    });
  }
}
