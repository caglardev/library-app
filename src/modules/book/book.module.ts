import { Module } from '@nestjs/common';
import { BookController } from './controller/book.controller';
import { BookService } from './service/book.service';
import { Book } from './entity/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from '../author/entity/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
