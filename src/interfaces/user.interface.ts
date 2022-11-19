import { Optional } from 'sequelize';

export interface UserInterface {
  userName: string;
  fullName: string;
  email: string;
  password: string;
  id: number;
}

export interface UserCreationAttributes extends Optional<UserInterface, 'id'> {}
