import { Module } from '@nestjs/common';
import { UserController } from './users/user.controller';
import { UserModule } from './users/user.module';
import { usersProviders } from './users/user.provider';
import { UserService } from './users/user.service';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { PostService } from './post/post.service';
import { PostController } from './post/post.controller';
import { postsProviders } from './post/post.provider';

@Module({
  imports: [UserModule, AuthModule, PostModule],
  controllers: [UserController, PostController],
  providers: [
    ...usersProviders,
    ...postsProviders,
    UserService,
    AuthModule,
    PostModule,
    PostService,
  ],
  exports: [],
})
export class AppModule {}
