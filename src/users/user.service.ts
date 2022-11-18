import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORIES } from 'src/constants/constants';
import { User } from '../models/user.model';
import * as bcrypt from 'bcrypt';
import { UserInterface } from '../interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject(REPOSITORIES.USERS_REPOSITORY)
    private usersRepository: typeof User,
  ) {}

  async registerUser(user: UserInterface): Promise<User> {
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    const [newUser, created] = await this.usersRepository.findOrCreate({
      where: { ...user },
    });
    return created && newUser;
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
