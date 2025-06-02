import { Module } from '@nestjs/common';
import { FakeController } from './controller/fake.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from '../author/entity/author.entity';
import { Book, ComicBook } from '../book/entity/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Author, Book, ComicBook])],
  controllers: [FakeController],
  providers: [],
})
export class FakeModule {}
