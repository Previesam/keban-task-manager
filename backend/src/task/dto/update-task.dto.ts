import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  details?: string | undefined;
  deadline?: string | undefined;
  status?: string;
}
