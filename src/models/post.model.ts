import {
  AllowNull,
  Column,
  DataType,
  Default,
  Length,
  Model,
  Table,
} from 'sequelize-typescript';
import { POST_STATUSES } from '../constants/constants';
import { PostCreationAttributes } from '../interfaces/post.interface';

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

  @Default(POST_STATUSES.DRAFTED)
  @Column(DataType.STRING)
  status: string;

  @AllowNull(false)
  @Column(DataType.BIGINT)
  userId: number;

  @Default(false)
  @AllowNull(true)
  @Column
  deleted: boolean;
}
