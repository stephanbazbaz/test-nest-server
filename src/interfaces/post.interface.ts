import { Optional } from 'sequelize';

export interface PostInterface {
  title: string;
  content: string;
  status: string;
  id: number;
  deleted: boolean;
}

export interface PostCreationAttributes extends Optional<PostInterface, 'id'> {}

export interface PostQueryInterface {
  id: number;
  idx: number;
  sortColumn: string;
  isSortAsc: boolean;
}
