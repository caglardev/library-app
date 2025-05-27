import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/modules/book/entity/book.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  search(query: string): Promise<Book[]> {
    return this.booksRepository.find({ where: { name: Like(`%${query}%`) } });
  }
}
