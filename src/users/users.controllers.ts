import { Controller, Delete, Get, Param } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private userService: UsersService) {}

  @Get()
  async getUsers() {
    const users = await this.userService.findAll();
    return {
      message:
        users !== null
          ? 'Users fetched successfully'
          : 'Users not fetched successfully',
      users,
    };
  }

  @Get(':id')
  async getProfile(@Param('id') id: string) {
    const user = await this.userService.findOne(Number(id));
    return {
      message:
        user !== null ? 'User fetched id=>' + id : 'User was not fetched',
      user,
    };
  }

  @Delete(':id')
  DeleteUser(@Param('id') id: string) {
    this.userService.remove(Number(id));
    return {
      message: `User with id=>${id} deleted`,
    };
  }

  @Delete()
  DeleteAll() {
    this.userService.removeAll();
    return {
      message: 'Users deleted',
    };
  }
}
