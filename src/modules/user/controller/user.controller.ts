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
import { Book } from 'src/modules/book/entity/book.entity';

const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
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

  // TODO add validation for the case: to param is before from param
  @Get(':id/books')
  async getBooksOfUserBetweenDates(
    @Param('id') id: number,
    @Query('from') from: string,
    @Query('to') to: string,
  ): Promise<Book[]> {
    // Validate 'from' as a date in format YYYY-MM-DD
    if (from && !dateRegex.test(from)) {
      throw new HttpException(
        'Invalid "from" date format',
        HttpStatus.BAD_REQUEST,
      );
    }
    // Validate 'to' as a date in format YYYY-MM-DD
    if (to && !dateRegex.test(to)) {
      throw new HttpException(
        'Invalid "to" date format',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.userService.getBooksOfUserBetweenDates(id, {
      from: new Date(from),
      to: new Date(to),
    });
  }
}
