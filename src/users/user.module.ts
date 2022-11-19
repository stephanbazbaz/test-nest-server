import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.model';
import { UserController } from './user.controller';
import { usersProviders } from './user.provider';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [...usersProviders, UserService],
  exports: [UserService],
})
export class UserModule {}
