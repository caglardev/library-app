import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from '../service/book.service';
import { Book } from '../entity/book.entity';
import { BookDto } from '../dto/book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async findAll(): Promise<Book[]> {
    return await this.bookService.findAll();
  }

  @Get('favorites')
  async getFavorites(): Promise<Book[] | undefined> {
    const result = await this.bookService.getFavorites();
    if (result) {
      return result;
    }
    throw new HttpException('not found', HttpStatus.NOT_FOUND);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Book> {
    const result = await this.bookService.findOne(id);
    if (result) {
      return result;
    }
    throw new HttpException('not found', HttpStatus.NOT_FOUND);
  }

  //TODO add author validation.
  //TODO move validation to service layer.
  @Post()
  create(@Body() bookDto: BookDto): Promise<Book> {
    if (bookDto.name && bookDto.authorId) {
      return this.bookService.create(bookDto);
    }
    throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.bookService.remove(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() bookDto: BookDto,
  ): Promise<void> {
    try {
      await this.bookService.update(id, bookDto);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.message === 'Book not found') {
        throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
