import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';

import { env } from 'src/utils/functions';

import * as bcrypt from 'bcrypt';

import validator from 'validator';
import { ReversedUserStatusses } from 'src/db/models/user.model';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() registerAuthDto: RegisterAuthDto,
  ) {
    try {
      let body: any = registerAuthDto;
      let keys = Object.keys(registerAuthDto);
      let errors: any = {};

      for (let key of keys) {
        if (validator.isEmpty(body?.[key]?.toString())) {
          errors[key] = 'Field is required';
        } else if (
          key == 'email' &&
          !validator.isEmail(body?.[key]?.toString())
        ) {
          errors[key] = 'Invalid email address, please check';
        } else if (
          key == 'password' &&
          !validator.isStrongPassword(body?.[key]?.toString(), {
            minLength: 6,
            minLowercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            minUppercase: 1,
          })
        ) {
          errors[key] =
            'Weak password, password must be at least 6 chracters long and must include atleast one of each of lowercase, uppercase, numbers and special characters';
        } else if (
          key == 'confirm_password' &&
          body?.password !== body?.confirm_password
        ) {
          errors[key] = 'Password mismatch, check confirm password';
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

      if (body?.confirm_password) {
        delete body?.confirm_password;
      }

      body.password = bcrypt.hashSync(
        body?.password,
        parseInt(env('SALT_WORK_FACTOR')),
      );

      const user: any = await this.userService.create(body);

      res.statusCode = 201;

      return {
        status: 'success',
        message: 'Account created successfully!',
        data: { user: { id: user?.id } },
        errors: null,
      };
    } catch (err) {
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

  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() loginAuthDto: LoginAuthDto,
  ) {
    try {
      const { email, password } = loginAuthDto;

      let keys = ['email', 'password'];

      let errors: any = {};

      for (let key of keys) {
        if (validator.isEmpty((loginAuthDto as any)[key])) {
          errors[key] = 'Field is required';
        } else if (
          key == 'email' &&
          !validator.isEmail((loginAuthDto as any)[key])
        ) {
          errors[key] = 'Invalid email address, please check';
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

      const user: any = await this.userService.findOne({
        where: { email: email },
      });

      if (!user || !bcrypt?.compareSync(password, user?.password)) {
        res.statusCode = 400;
        return {
          status: 'error',
          message: 'Incorrect login details',
          data: null,
          errors: null,
        };
      }

      if (user.status == ReversedUserStatusses[0]) {
        res.statusCode = 400;
        return {
          status: 'error',
          message: 'You account has been deactivated',
          data: null,
          errors: null,
        };
      }

      delete user?.password;

      const token = await this.authService.generateToken({ user });

      res.statusCode = 200;

      return {
        status: 'success',
        message: 'Login successful!',
        data: { token, user },
        errors: null,
      };
    } catch (err) {
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

  @UseGuards(AuthGuard)
  @Get('logout')
  logout() {
    return {
      status: 'success',
      message: 'Logout successful!',
      data: null,
      errors: null,
    };
  }

  @UseGuards(AuthGuard)
  @Get('user')
  user(@Request() req: any) {
    return {
      status: 'success',
      message: 'Auth user fetched successfully!',
      data: { user: req.user },
      errors: null,
    };
  }
}
