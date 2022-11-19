import { Optional } from 'sequelize';
import {
  AllowNull,
  Column,
  DataType,
  Default,
  Length,
  Model,
  Table,
} from 'sequelize-typescript';
import { PostCreationAttributes } from '../interfaces/post.interface';

// export interface PostCreationAttributes extends Optional<PostInterface, 'id'> {}

@Table({ timestamps: true })
export class Post extends Model implements PostCreationAttributes {
  @AllowNull(false)
  @Length({ min: 1 })
  @Column(DataType.STRING)
  title: string;

  @AllowNull(false)
  @Length({ min: 1 })
  @Column(DataType.STRING)
  content: string;

  @Default('Drafted')
  @Column(DataType.STRING)
  status: string;

  @AllowNull(false)
  @Column(DataType.BIGINT)
  userId: number;
}
