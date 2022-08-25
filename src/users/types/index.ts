import { Exclude } from 'class-transformer';

export interface IUser {
  id: number;
  username: string;
  password: string;
}

export class SerializedUser {
  id: number;
  
  username: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial);
  }
}
