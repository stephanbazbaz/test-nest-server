import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from '../dtos/cretaeUserDto';
import { Response } from 'express';
import { MSG } from '../constants/constants';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/register')
  async registerUser(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    const newUser = await this.userService.registerUser(createUserDto);
    if (!newUser)
      return res.status(HttpStatus.CONFLICT).json({
        msg: MSG.EMAIL_REGISTERED,
      });
    return res.status(HttpStatus.CREATED).json({
      newUser,
    });
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
