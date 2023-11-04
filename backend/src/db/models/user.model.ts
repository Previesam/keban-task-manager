import { Model, DataTypes } from 'sequelize';
import sequelize from '../main';
import Task from './task.model';

export const UserStatusses = {
  inactive: 0,
  active: 1,
};

export const ReversedUserStatusses = {
  0: 'inactive',
  1: 'active',
};

class User extends Model {}

User.init(
  {
    first_name: { type: DataTypes.CHAR, allowNull: false },
    last_name: { type: DataTypes.CHAR, allowNull: false },
    email: { type: DataTypes.CHAR, allowNull: false, unique: 'email' },
    password: { type: DataTypes.CHAR, allowNull: false },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      set(val) {
        if (typeof val == 'string') {
          this.setDataValue('status', (UserStatusses as any)[val as any]);
        } else {
          this.setDataValue('status', val);
        }
      },
      get() {
        return (ReversedUserStatusses as any)[
          this.getDataValue('status') as any
        ] as number;
      },
    },
  },
  { sequelize, timestamps: true, underscored: true },
);

export default User;
