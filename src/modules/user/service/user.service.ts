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
    return await this.userRepository.findOne({ where: { id } });
  }

  async getBooksOfUserBetweenDates(
    id: number,
    dates: { from: Date; to: Date },
  ): Promise<Book[]> {
    const borrows = await this.borrowRepository.find({
      where: { user: { id } },
      relations: ['book', 'user', 'book.author'],
    });
    return borrows
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
}
