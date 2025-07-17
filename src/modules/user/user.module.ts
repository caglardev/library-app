import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { Borrow } from '../borrow/entity/borrow.entity';
import { Author } from '../author/entity/author.entity';
import { Book } from '../book/entity/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Borrow, Book, Author])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
