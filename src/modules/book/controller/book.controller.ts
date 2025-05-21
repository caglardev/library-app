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
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async findAll(): Promise<Book[]> {
    return await this.bookService.findAll();
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
  create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    if (createBookDto?.name !== undefined && createBookDto?.name !== '') {
      return this.bookService.create(createBookDto);
    }
    throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.bookService.remove(id);
  }

  //TODO move validation to service layer.
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<void> {
    // Parse authorIds if it's a string
    if (typeof updateBookDto.authorIds === 'string') {
      updateBookDto.authorIds = updateBookDto.authorIds
        .split(',') // Split the string by commas
        .map((id) => parseInt(id.trim(), 10)) // Trim whitespace and convert to numbers
        .filter((id) => !isNaN(id)); // Filter out invalid numbers
    }

    // Validate the request body
    if (
      (updateBookDto?.name === undefined || updateBookDto?.name === '') &&
      (updateBookDto?.authorIds === undefined ||
        !Array.isArray(updateBookDto.authorIds))
    ) {
      throw new HttpException(
        'No valid fields to update',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.bookService.update(id, updateBookDto);
    } catch (error) {
      // Handle specific errors if needed
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
