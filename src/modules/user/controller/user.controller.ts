import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { User } from '../user.entity';
import { UserService } from '../service/user.service';

const dateRegex = /^([0-2]\d|3[01])-(0\d|1[0-2])-\d{4}$/;
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

  @Get(':id/books')
  getBooks(
    @Param('id') id: number,
    @Query('from') from: string,
    @Query('to') to: string,
  ): string {
    // Validate 'from' as a date in format DD-MM-YYYY
    if (from && !dateRegex.test(from)) {
      throw new HttpException(
        'Invalid "from" date format',
        HttpStatus.BAD_REQUEST,
      );
    }
    // Validate 'to' as a date in format DD-MM-YYYY
    if (to && !dateRegex.test(to)) {
      throw new HttpException(
        'Invalid "to" date format',
        HttpStatus.BAD_REQUEST,
      );
    }

    return `test with date id ${id} and from ${from} to ${to}`;
  }
}
