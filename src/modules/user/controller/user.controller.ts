import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { User } from '../user.entity';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    const result = await this.userService.findOne(id);
    if (result) {
      return result;
    }
    throw new HttpException('not found', HttpStatus.NOT_FOUND);
  }
}
