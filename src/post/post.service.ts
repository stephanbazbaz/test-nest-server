import { Inject, Injectable } from '@nestjs/common';
import {
  offensiveWords,
  POST_STATUSES,
  REPOSITORIES,
} from '../constants/constants';
import { Post } from '../models/post.model';
import { getPostsQuery } from './post.query';
import {
  PostCreationAttributes,
  PostQueryInterface,
  PostInterface,
} from '../interfaces/post.interface';

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
      return err;
    }
  }

  confirmPostsAfterReview(id: number): Promise<Post> {
    const payload = { id, status: POST_STATUSES.PUBLISHED };
    return this.changePostStatus({ payload });
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
    const payload = { id, status: POST_STATUSES.WAITING };
    const post = await this.changePostStatus({ payload });
    return this.reviewPost(post);
  }

  getPostById(id: number) {
    try {
      return this.postsRepository.findOne({ where: { id } });
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  updatePost(args: any): Promise<Post> {
    try {
      const { id, ...values } = args;
      const post = this.getPostById(id);
      Object.entries(values).forEach(([key, value]) => {
        post.then((post) => {
          post[key] = value;
          post.save();
        });
      });
      return post;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  async changePostStatus({ payload }): Promise<Post> {
    return this.updatePost({ ...payload });
  }

  async editPost(payload: PostCreationAttributes) {
    return this.updatePost({ ...payload });
  }

  getPosts(payload: PostQueryInterface): Promise<Post[]> {
    try {
      const condition = getPostsQuery({ payload });
      return this.postsRepository.findAll(condition);
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  deletePost(id: number) {
    const payload = { id, deleted: true };
    return this.updatePost(payload);
  }
}
