import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import validator from 'validator';
import Task from 'src/db/models/task.model';
import { DestroyOptions, FindOptions, UpdateOptions } from 'sequelize';
import { Response } from 'express';

@Injectable()
export class TaskService {
  async create(createTaskDto: CreateTaskDto, res: Response) {
    try {
      let errors: any = {};
      for (let key in createTaskDto) {
        if (validator.isEmpty((createTaskDto as any)?.[key]?.toString())) {
          errors[key] = 'Field is required';
        } else {
          errors[key] = '';
        }
      }

      if (!validator.isEmpty(Object.values(errors).join(''))) {
        res.statusCode = 400;
        return {
          status: 'error',
          message: 'Form validation error',
          data: null,
          errors,
        };
      }

      let task = await Task.create({
        ...(createTaskDto as any),
      });

      res.statusCode = 201;

      return {
        status: 'success',
        message: 'Task created successfully',
        data: { task },
        errors: null,
      };
    } catch (err: any) {
      console.log(err);
      res.statusCode = 500;
      return {
        status: 'error',
        message: err?.message,
        data: null,
        errors: err,
      };
    }
  }

  async findAll(opt: FindOptions | null, res: Response) {
    try {
      let tasks = await Task.findAll(opt ? opt : undefined);
      res.statusCode = 200;
      return {
        status: 'success',
        message: 'Tasks fetched successfully',
        data: { tasks },
        errors: null,
      };
    } catch (err: any) {
      res.statusCode = 500;
      return {
        status: 'error',
        message: err?.message,
        data: null,
        errors: err,
      };
    }
  }

  async findOne(opt: FindOptions, res: Response) {
    try {
      let task = await Task.findOne(opt);
      res.statusCode = 200;
      return {
        status: 'success',
        message: 'Task fetched successfully',
        data: { task },
        errors: null,
      };
    } catch (err: any) {
      res.statusCode = 500;
      return {
        status: 'error',
        message: err?.message,
        data: null,
        errors: err,
      };
    }
  }

  async findByPk(id: number, res: Response) {
    try {
      const task = await Task.findByPk(id);
      res.statusCode = 200;
      return {
        status: 'success',
        message: 'Task fetched successfully',
        data: { task },
        errors: null,
      };
    } catch (err: any) {
      res.statusCode = 500;
      return {
        status: 'error',
        message: err?.message,
        data: null,
        errors: err,
      };
    }
  }

  async update(
    opt: UpdateOptions,
    updateTaskDto: UpdateTaskDto,
    res: Response,
  ) {
    try {
      let update = {
        ...(updateTaskDto as any),
      };

      await Task.update(update, opt);

      res.statusCode = 200;

      return {
        status: 'success',
        message: 'Task updated successfully',
        data: { task: await Task.findOne(opt) },
        errors: null,
      };
    } catch (err: any) {
      res.statusCode = 500;
      return {
        status: 'error',
        message: err?.message,
        data: null,
        errors: err,
      };
    }
  }

  async remove(opt: DestroyOptions, res: Response) {
    try {
      await Task.destroy(opt);
      res.statusCode = 200;
      return {
        status: 'success',
        message: 'Task deleted successfully',
        data: null,
        errors: null,
      };
    } catch (err: any) {
      res.statusCode = 500;
      return {
        status: 'error',
        message: err?.message,
        data: null,
        errors: err,
      };
    }
  }
}
