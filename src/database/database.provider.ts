import { Sequelize } from 'sequelize-typescript';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { configService } from '../util/configService';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const dbConfig: any = {
        dialect: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        models: [User, Post],
      };

      const sequelize = new Sequelize(dbConfig);
      // sequelize.addModels([User, Post]);
      // await sequelize.sync();
      return sequelize;
    },
  },
];
