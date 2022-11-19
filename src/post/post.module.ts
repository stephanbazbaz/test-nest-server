import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.model';
import { PostController } from './post.controller';
import { postsProviders } from './post.provider';
import { PostService } from './post.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PostController],
  providers: [...postsProviders, PostService],
  exports: [PostService],
})
export class PostModule {}
