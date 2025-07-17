import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Borrow } from '../entity/borrow.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BorrowService {
  constructor(
    @InjectRepository(Borrow)
    private borrowRepository: Repository<Borrow>,
  ) {}

  async findAll(): Promise<Borrow[]> {
    return (
      await this.borrowRepository.find({
        relations: ['user'],
      })
    ).sort((a, b) => {
      return a.user.id - b.user.id;
    });
  }
}
