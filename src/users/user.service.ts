import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORIES } from '../constants/constants';
import { User } from '../models/user.model';
import { UserCreationAttributes } from '../interfaces/user.interface';
import { hashPassword } from '../util/helpers';

@Injectable()
export class UserService {
  constructor(
    @Inject(REPOSITORIES.USERS_REPOSITORY)
    private usersRepository: typeof User,
  ) {}

  async registerUser(user: UserCreationAttributes) {
    try {
      user.password = await hashPassword(user.password);
      const newUser = await this.usersRepository.create({ ...user });
      const userObj = Object.assign({}, newUser.dataValues);
      if (userObj) {
        const { userName, fullName } = userObj;
        return { userName, fullName };
      }
      return newUser;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  async findOne(email: string): Promise<User | undefined> {
    try {
      return await this.usersRepository.findOne({
        where: { email },
      });
    } catch (err) {
      console.error(err);
      return err;
    }
  }
}
