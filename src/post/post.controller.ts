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

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/createDraft')
  async createPostDraft(@Body() payload: PostInterface, @Res() res: Response) {
    const draft = await this.postService.createPostDraft(payload);
    return res.status(HttpStatus.CREATED).json({
      draft,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/publishPost/:id')
  async publishPost(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const response = await this.postService.publishPost(id);
    return res.json(response);
  }

  @Get('/confirmPostsAfterReview/:id')
  async confirmPostsAfterReview(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const response = await this.postService.confirmPostsAfterReview(id);
    return res.json(response);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/editPost')
  async editPost(@Body() post: PostInterface, @Res() res: Response) {
    const response = await this.postService.editPost(post);
    return res.json(response);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/getPosts')
  async getPosts(@Body() payload: PostQueryInterface, @Res() res: Response) {
    const response = await this.postService.getPosts(payload);
    return res.json(response);
  }

  @UseGuards(JwtAuthGuard)
  @Get('deletePost/:id')
  async deletePost(@Param('id') id: number, @Res() res: Response) {
    const response = await this.postService.deletePost(id);
    return res.json(response);
  }
}
