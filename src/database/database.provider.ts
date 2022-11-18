import { Sequelize } from 'sequelize-typescript';
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
        models: [User],
      });
      // sequelize.addModels([User]);
      // await sequelize.sync();
      return sequelize;
    },
  },
];
