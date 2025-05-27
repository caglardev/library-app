import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../entity/book.entity';
import { Repository } from 'typeorm';
import { BookDto } from '../dto/book.dto';
import { Author } from '../../author/entity/author.entity';
import { BookBuilder } from '../builder/book.builder';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
  ) {}

  findAll(): Promise<Book[]> {
    return this.booksRepository.find({ relations: ['author'] });
  }

  async findOne(id: number): Promise<Book | null> {
    return this.booksRepository.findOne({
      where: { id },
      relations: ['author'],
    });
  }

  async create(bookDto: BookDto): Promise<Book> {
    const bookBuilder = new BookBuilder().setName(bookDto.name);
    const authorId = Number(bookDto.authorId);
    if (authorId) {
      const author = await this.authorsRepository.findOneBy({
        id: authorId,
      });
      if (author) bookBuilder.setAuthor(author);
    }
    const book = bookBuilder.getBook();
    return this.booksRepository.save(book);
  }

  async remove(id: number): Promise<void> {
    await this.booksRepository.delete(id);
  }

  async update(id: number, bookDto: BookDto): Promise<void> {
    const book = await this.booksRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!book) {
      throw new Error('Book not found');
    }

    const bookBuilder = new BookBuilder()
      .setId(book.id)
      .setName(book.name)
      .setAuthor(book.author);

    // Update the book's properties
    if (bookDto.name) {
      bookBuilder.setName(bookDto.name);
    }

    // Update the authors if authorId are provided
    const authorId = Number(bookDto.authorId);
    if (authorId) {
      const author = await this.authorsRepository.findOneBy({
        id: authorId,
      });
      if (author) bookBuilder.setAuthor(author);
    }

    await this.booksRepository.save(bookBuilder.getBook());
  }
}
