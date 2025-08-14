import { Module } from '@nestjs/common';
import { BookController } from './controller/book.controller';
import { BookService } from './service/book.service';
import { Book, ComicBook } from './entity/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from '../author/entity/author.entity';
import { User } from '../user/user.entity';
import { Borrow } from '../borrow/entity/borrow.entity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, ComicBook, Author, User, Borrow]),
    CacheModule.register({ ttl: 5000 }),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
