import { REPOSITORIES } from '../constants/constants';
import { Post } from '../models/post.model';

export const postsProviders = [
  {
    provide: REPOSITORIES.POSTS_REPOSITORY,
    useValue: Post,
  },
];
