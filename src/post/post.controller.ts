import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from '@nestjs/common';
import { CreatePostDto } from '../dtos/createPostDto';
import { PostService } from './post.service';
import { PostInterface } from '../interfaces/post.interface';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post('/createDraft')
  async createPostDraft(@Body() createPostDto: CreatePostDto, @Res() res) {
    const draft = await this.postService.createPostDraft(createPostDto);
    return res.status(HttpStatus.CREATED).json({
      draft,
    });
  }

  @Get('/publishPost/:id')
  async publishPost(@Param('id', ParseIntPipe) id: number, @Res() res) {
    const response = await this.postService.publishPost(id);
    return res.json(response);
  }

  @Get('/confirmPostsAfterReview/:id')
  async confirmPostsAfterReview(
    @Param('id', ParseIntPipe) id: number,
    @Res() res,
  ) {
    const response = await this.postService.confirmPostsAfterReview(id);
    return res.json(response);
  }

  @Post('/editPost')
  async editPost(@Body() post: PostInterface, @Res() res) {
    const response = await this.postService.editPost(post);
    return res.json(response);
  }

  @Get('/getPosts/:id/:idx')
  async getPosts(
    @Param('id') id: number,
    @Param('idx') idx: number,
    @Res() res,
  ) {
    const response = await this.postService.getPosts(id, idx);
    return res.json(response);
  }
}
