import { REPOSITORIES } from '../constants/constants';
import { User } from '../models/user.model';

export const usersProviders = [
  {
    provide: REPOSITORIES.USERS_REPOSITORY,
    useValue: User,
  },
];
