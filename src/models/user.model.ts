import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  Length,
  Model,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { UserCreationAttributes } from '../interfaces/user.interface';

@Table
export class User extends Model implements UserCreationAttributes {
  @AllowNull(false)
  @Length({ min: 3 })
  @Column(DataType.STRING)
  userName: string;

  @AllowNull(false)
  @Length({ min: 3 })
  @Column(DataType.STRING)
  fullName: string;

  @Unique
  @AllowNull(false)
  @Length({ min: 3 })
  @Column(DataType.STRING)
  email: string;

  @AllowNull(false)
  @Length({ min: 8 })
  @Column(DataType.STRING)
  password: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
