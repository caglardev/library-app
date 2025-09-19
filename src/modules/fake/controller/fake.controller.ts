import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '../../author/entity/author.entity';
import { Book, ComicBook } from '../../book/entity/book.entity';
import { faker } from '@faker-js/faker';
import { BookBuilder, ComicBookBuilder } from '../../book/builder/book.builder';

@Controller('create-fake-data')
export class FakeController {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(ComicBook)
    private readonly comicBookRepository: Repository<ComicBook>,
  ) {}

  @Get()
  async getFakeData(): Promise<string> {
    const CHUNKSIZE = 100; // Number of entities to save per chunk

    // Create 100 authors
    const authors = Array.from({ length: 100 }).map(() => {
      const author = new Author();
      author.name = faker.person.fullName();
      return author;
    });

    // Save authors in chunks with transactions
    const authorChunks = getChunkArray(authors, CHUNKSIZE);
    for (const chunk of authorChunks) {
      await this.authorRepository.manager.transaction(async (manager) => {
        await manager.save(chunk);
      });
    }

    // Create 1000 books and link them to authors
    const books = Array.from({ length: 1000 }).map(() => {
      const book = new BookBuilder()
        .name(faker.lorem.words(3))
        .author(faker.helpers.arrayElement(authors))
        .build();
      return book;
    });

    // Save books in chunks with transactions
    const bookChunks = getChunkArray(books, CHUNKSIZE);
    for (const chunk of bookChunks) {
      await this.bookRepository.manager.transaction(async (manager) => {
        await manager.save(chunk);
      });
    }

    // Create 500 comic books and link them to authors
    const comicBooks = Array.from({ length: 500 }).map(() => {
      const comicBook = new ComicBookBuilder()
        .name(faker.lorem.words(3))
        .setAmountOfPictures(faker.number.int({ min: 10, max: 100 }))
        .author(faker.helpers.arrayElement(authors))
        .build();
      return comicBook;
    });

    // Save comic books in chunks with transactions
    const comicBookChunks = getChunkArray(comicBooks, CHUNKSIZE);
    for (const chunk of comicBookChunks) {
      await this.comicBookRepository.manager.transaction(async (manager) => {
        await manager.save(chunk);
      });
    }

    return 'Fake data created successfully!';
  }
}

function getChunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}
