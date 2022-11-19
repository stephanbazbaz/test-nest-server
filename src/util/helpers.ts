import * as bcrypt from 'bcrypt';
const salt = 10;
export const hashPassword = (password: string) =>
  bcrypt.hashSync(password, salt);
