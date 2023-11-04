import { Model, DataTypes } from 'sequelize';
import sequelize from '../main';

export const TaskStatusses = {
  Open: 0,
  'In progress': 1,
  Completed: 2,
  'On hold': 3,
};

export const ReversedTaskStatusses = {
  0: 'Open',
  1: 'In progress',
  2: 'Completed',
  3: 'On hold',
};

class Task extends Model {}

Task.init(
  {
    details: { type: DataTypes.CHAR, allowNull: false },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      set(val) {
        if (typeof val == 'string') {
          this.setDataValue('status', (TaskStatusses as any)[val]);
        } else {
          this.setDataValue('status', val);
        }
      },
      get() {
        return (ReversedTaskStatusses as any)[
          this.getDataValue('status') as any
        ];
      },
    },
    deadline: { type: DataTypes.DATE, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, timestamps: true, underscored: true },
);

export default Task;
