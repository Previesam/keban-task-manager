import { Injectable } from '@nestjs/common';
import { CreateOptions, FindOptions } from 'sequelize';
import User from 'src/db/models/user.model';
import { CreateUserPayload, IUser } from './interfaces/user.interface';

@Injectable()
export class UserService {
  findOne(opt: FindOptions) {
    return User.findOne(opt);
  }
  create(user: CreateUserPayload, opt?: CreateOptions) {
    return User.create(user as any, opt);
  }
}
