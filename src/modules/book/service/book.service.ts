import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../entity/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from '../dto/create-book.dto';
import { Author } from '../entity/author.entity';
import { UpdateBookDto } from '../dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
  ) {}

  findAll(): Promise<Book[]> {
    return this.booksRepository.find({ relations: ['authors'] });
  }

  async findOne(id: number): Promise<Book | null> {
    return this.booksRepository.findOne({
      where: { id },
      relations: ['authors'],
    });
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = new Book();
    book.name = createBookDto.name;

    // Parse authorIds if it's a string
    let authorIds: number[] = [];
    if (typeof createBookDto.authorIds === 'string') {
      authorIds = createBookDto.authorIds
        .split(',') // Split the string by commas
        .map((id) => parseInt(id.trim(), 10)) // Trim whitespace and convert to numbers
        .filter((id) => !isNaN(id)); // Filter out invalid numbers
    } else if (Array.isArray(createBookDto.authorIds)) {
      authorIds = createBookDto.authorIds;
    }

    if (authorIds.length > 0) {
      const authors = await this.authorsRepository.findByIds(authorIds);
      book.authors = authors;
    }
    return this.booksRepository.save(book);
  }

  async remove(id: number): Promise<void> {
    await this.booksRepository.delete(id);
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<void> {
    const book = await this.booksRepository.findOne({
      where: { id },
      relations: ['authors'], // Load the authors relation
    });

    if (!book) {
      throw new Error('Book not found');
    }

    // Update the book's properties
    if (updateBookDto.name) {
      book.name = updateBookDto.name;
    }

    // Update the authors if authorIds are provided
    if (updateBookDto.authorIds && Array.isArray(updateBookDto.authorIds)) {
      const authors = await this.authorsRepository.findByIds(
        updateBookDto.authorIds,
      );
      book.authors = authors;
    }

    await this.booksRepository.save(book);
  }
}
