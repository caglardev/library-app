import { Module } from '@nestjs/common';
import { Borrow } from './entity/borrow.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Author } from '../author/entity/author.entity';
import { Book } from '../book/entity/book.entity';
import { BorrowController } from './controller/borrow.controller';
import { BorrowService } from './service/borrow.service';

@Module({
  imports: [TypeOrmModule.forFeature([Borrow, User, Author, Book])],
  controllers: [BorrowController],
  providers: [BorrowService],
})
export class BorrowModule {}
