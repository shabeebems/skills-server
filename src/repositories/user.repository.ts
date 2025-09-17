import UserModel, { IUser } from '../models/user.model';
import { BaseRepository } from './base.repository';

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(UserModel);
  }

  findByEmail = (email: string): Promise<IUser | null> =>
    this.model.findOne({ email });

}
