import { Inject, Injectable } from '@nestjs/common';
import { offensiveWords, REPOSITORIES } from 'src/constants/constants';
import { PostInterface } from 'src/interfaces/post.interface';
import { Post } from '../models/post.model';
import { getPostsQuery } from './post.query';

@Injectable()
export class PostService {
  constructor(
    @Inject(REPOSITORIES.POSTS_REPOSITORY)
    private postsRepository: typeof Post,
  ) {}

  createPostDraft(post: PostInterface): Promise<Post> {
    const draft = this.postsRepository.create({ ...post });
    return draft;
  }

  confirmPostsAfterReview(id: number): Promise<Post> {
    return this.changePostStatus(id, 'Published');
  }

  async reviewPost(post: Post) {
    const { content, id } = post;
    //Mock posts offensive words check
    if (offensiveWords.some((v) => content.includes(v))) {
      return {
        pending: true,
        msg: 'needs extra review',
      };
    }
    return this.confirmPostsAfterReview(id);
  }

  async publishPost(id: number) {
    const post = await this.changePostStatus(id, 'WaitingForReview');
    return this.reviewPost(post);
  }

  getPostById(id: number) {
    return this.postsRepository.findOne({ where: { id } });
  }

  async changePostStatus(id: number, status: string): Promise<Post> {
    return await this.getPostById(id).then((post) => {
      post.status = status;
      post.save();
      return post;
    });
  }

  async editPost(body: any): Promise<Post> {
    const { id, content, title } = body;
    return await this.getPostById(id).then((post) => {
      post.content = content;
      post.title = title;
      post.save();
      return post;
    });
  }

  getPosts(id: number, idx: number): Promise<Post[]> {
    const condition = getPostsQuery(id, idx);
    return this.postsRepository.findAll(condition);
  }
}
