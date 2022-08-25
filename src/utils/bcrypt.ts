import * as bcrypt from 'bcryptjs';

export function encodePassword(rawPassword: string) {
  const SALT = bcrypt.genSaltSync();

  return bcrypt.hashSync(rawPassword, SALT);
}

export function comparePasswords(rawPassword: string, hash: string) {
  return bcrypt.compareSync(rawPassword, hash);
}
