import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import {
  PostInterface,
  PostQueryInterface,
} from '../interfaces/post.interface';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post('/createDraft')
  async createPostDraft(@Body() payload: PostInterface, @Res() res: Response) {
    const draft = await this.postService.createPostDraft(payload);
    return res.status(HttpStatus.CREATED).json({
      draft,
    });
  }

  @Get('/publishPost/:id')
  async publishPost(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const response = await this.postService.publishPost(id);
    return res.status(HttpStatus.CREATED).json(response);
  }

  @Get('/confirmPostsAfterReview/:id')
  async confirmPostsAfterReview(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const response = await this.postService.confirmPostsAfterReview(id);
    return res.status(HttpStatus.ACCEPTED).json(response);
  }

  @Post('/editPost')
  async editPost(@Body() payload: PostInterface, @Res() res: Response) {
    const response = await this.postService.editPost(payload);
    return res.status(HttpStatus.OK).json(response);
  }

  // if id == 0 brings all posts
  @Post('/getPosts')
  async getPosts(@Body() payload: PostQueryInterface, @Res() res: Response) {
    const response = await this.postService.getPosts(payload);
    return res.status(HttpStatus.FOUND).json(response);
  }

  @Get('deletePost/:id')
  async deletePost(@Param('id') id: number, @Res() res: Response) {
    const response = await this.postService.deletePost(id);
    return res.status(HttpStatus.OK).json(response);
  }
}
