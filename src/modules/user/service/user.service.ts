import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { Borrow } from 'src/modules/borrow/entity/borrow.entity';
import { Book } from 'src/modules/book/entity/book.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Borrow)
    private borrowRepository: Repository<Borrow>,
  ) {}

  async findOne(id: number): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['borrows', 'borrows.book', 'borrows.book.author'],
    });
  }

  async getBooks(id: number): Promise<Book[]> {
    return (await this.getBorrows(id)).map((borrow) => borrow.book);
  }

  async getBooksOfUserBetweenDates(
    id: number,
    dates: { from: Date; to: Date },
  ): Promise<Book[]> {
    return (await this.getBorrows(id))
      .filter((borrow) => {
        const borrowDate = borrow.borrowedAt.getTime();
        if (
          borrowDate > dates.from.getTime() &&
          borrowDate < dates.to.getTime()
        ) {
          return borrow;
        }
      })
      .map((borrow) => borrow.book)
      .sort((a, b) => {
        return a.id - b.id;
      });
  }

  private async getBorrows(id: number): Promise<Borrow[]> {
    return await this.borrowRepository.find({
      where: { user: { id } },
      relations: ['book', 'book.author'],
    });
  }
}
