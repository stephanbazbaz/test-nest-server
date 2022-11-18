import { Module } from '@nestjs/common';
import { UserController } from './users/user.controller';
import { UserModule } from './users/user.module';
import { usersProviders } from './users/user.provider';
import { UserService } from './users/user.service';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [UserModule, AuthModule],
  controllers: [UserController],
  providers: [...usersProviders, UserService, AuthModule],
  exports: [],
})
export class AppModule {}
