import { Inject, Injectable } from '@nestjs/common';
import { offensiveWords, REPOSITORIES } from '../constants/constants';
import { PostInterface } from '../interfaces/post.interface';
import { Post } from '../models/post.model';
import { getPostsQuery } from './post.query';
import { PostCreationAttributes } from '../interfaces/post.interface';
@Injectable()
export class PostService {
  constructor(
    @Inject(REPOSITORIES.POSTS_REPOSITORY)
    private postsRepository: typeof Post,
  ) {}

  createPostDraft(post: PostInterface): Promise<Post> {
    try {
      const draft = this.postsRepository.create({ ...post });
      return draft;
    } catch (err) {
      console.error(err);
    }
  }

  confirmPostsAfterReview(id: number): Promise<Post> {
    return this.changePostStatus(id, 'Published');
  }

  async reviewPost(post: PostCreationAttributes) {
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
    try {
      return this.postsRepository.findOne({ where: { id } });
    } catch (err) {
      console.error(err);
    }
  }

  async updatePost(args: any) {
    try {
      const { id, ...values } = args;
      const post = this.getPostById(id);
      await Object.entries(values).forEach(([key, value]) => {
        post.then((post) => {
          post[key] = value;
          post.save();
        });
      });
      return post;
    } catch (err) {
      console.error(err);
    }
  }

  async changePostStatus(id: number, status: string): Promise<Post> {
    const payload = { id, status };
    return this.updatePost(payload);
  }

  async editPost(payload: PostCreationAttributes) {
    return this.updatePost(payload);
  }

  getPosts(id: number, idx: number): Promise<Post[]> {
    try {
      const condition = getPostsQuery(id, idx);
      return this.postsRepository.findAll(condition);
    } catch (err) {
      console.error(err);
    }
  }
}
