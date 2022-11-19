import { Sequelize } from 'sequelize-typescript';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'amiramir16',
        database: 'nrich_db_2',
        models: [User, Post],
      });
      // sequelize.addModels([Post]);
      // await sequelize.sync();
      return sequelize;
    },
  },
];
