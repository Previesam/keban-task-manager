import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  Request,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request as RequestType, Response as ResponseType } from 'express';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(
    @Res({ passthrough: true }) res: ResponseType,
    @Body() createTaskDto: CreateTaskDto,
    @Request() req: RequestType,
  ) {
    const body = { ...createTaskDto, user_id: (req as any)?.user?.id };
    return this.taskService.create(body, res);
  }

  @Get()
  async findAll(
    @Res({ passthrough: true }) res: ResponseType,
    @Request() req: RequestType,
  ) {
    return await this.taskService.findAll(
      { where: { user_id: (req as any)?.user?.id } },
      res,
    );
  }

  @Get(':id')
  async findOne(
    @Res({ passthrough: true }) res: ResponseType,
    @Param('id') id: string,
    @Request() req: RequestType,
  ) {
    return await this.taskService.findOne(
      { where: { id: +id, user_id: (req as any)?.user?.id } },
      res,
    );
  }

  @Patch(':id')
  async update(
    @Res({ passthrough: true }) res: ResponseType,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req: RequestType,
  ) {
    return await this.taskService.update(
      { where: { id: +id, user_id: (req as any)?.user?.id } },
      updateTaskDto,
      res,
    );
  }

  @Delete(':id')
  async remove(
    @Res({ passthrough: true }) res: ResponseType,
    @Param('id') id: string,
    @Request() req: RequestType,
  ) {
    return await this.taskService.remove(
      { where: { id: +id, user_id: (req as any)?.user?.id } },
      res,
    );
  }
}
