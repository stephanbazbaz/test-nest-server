import {
  AllowNull,
  Column,
  DataType,
  Default,
  IsUUID,
  Length,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { PostInterface } from '../interfaces/post.interface';

@Table({ timestamps: true })
export class Post extends Model implements PostInterface {
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
