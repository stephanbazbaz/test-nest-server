import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    const validatePassword = await bcrypt.compare(password, user.password);
    if (user && validatePassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const { email, id } = user.dataValues;
    const payload = { email, sub: id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
