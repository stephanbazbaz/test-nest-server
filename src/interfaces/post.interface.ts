import { Optional } from 'sequelize';

export interface PostInterface {
  title: string;
  content: string;
  status: string;
  id: number;
}

export interface PostCreationAttributes extends Optional<PostInterface, 'id'> {}
