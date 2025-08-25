import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book, ComicBook } from '../entity/book.entity';
import { Repository } from 'typeorm';
import { BookDto } from '../dto/book.dto';
import { Author } from '../../author/entity/author.entity';
import { BookBuilder, ComicBookBuilder } from '../builder/book.builder';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class BookService {
  private readonly logger = new Logger('BookServiceLogger');

  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectRepository(ComicBook)
    private comicBooksRepository: Repository<ComicBook>,
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  findAll(): Promise<Book[]> {
    return this.booksRepository.find({ relations: ['author'] });
  }

  async findOne(id: number): Promise<Book | null> {
    const cached = await this.getCacheKey(id.toString());
    if (cached) {
      const result = JSON.parse(cached) as Book;
      return result;
    }
    const result = await this.booksRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (result) {
      await this.setCacheKey(id.toString(), JSON.stringify(result));
    }
    return result;
  }

  async create(bookDto: BookDto): Promise<Book> {
    let bookBuilder: BookBuilder;
    if (bookDto.amountOfPictures) {
      bookBuilder = new ComicBookBuilder();
      const book = await this.getComicBook(
        bookDto,
        bookBuilder as ComicBookBuilder,
      );
      return this.comicBooksRepository.save(book);
    }
    bookBuilder = new BookBuilder().setName(bookDto.name);

    const author = await this.getAuthor(bookDto.authorId);
    if (author) bookBuilder.setAuthor(author);

    const book = bookBuilder.getBook();
    return this.booksRepository.save(book);
  }

  async remove(id: number): Promise<void> {
    await this.booksRepository.delete(id);
  }
  //TODO: transform a (regular book) to a (comic book) and vice versa.
  async update(id: number, bookDto: BookDto): Promise<void> {
    const book = await this.booksRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!book) {
      throw new Error('Book not found');
    }

    let bookBuilder: BookBuilder;
    if (bookDto.amountOfPictures) {
      bookBuilder = new ComicBookBuilder();
      const book = await this.getComicBook(
        bookDto,
        bookBuilder as ComicBookBuilder,
      );
      await this.comicBooksRepository.save(book);
      return;
    }

    bookBuilder = new BookBuilder().setId(book.id).setAuthor(book.author);

    if (bookDto.name) {
      bookBuilder.setName(bookDto.name);
    }

    const author = await this.getAuthor(bookDto.authorId);
    if (author) bookBuilder.setAuthor(author);

    const updatedBook = bookBuilder.getBook();
    await this.booksRepository.save(updatedBook);
  }

  private async getComicBook(
    bookDto: BookDto,
    bookBuilder: ComicBookBuilder,
  ): Promise<ComicBook> {
    bookBuilder
      .setName(bookDto.name)
      .setAmountOfPictures(bookDto.amountOfPictures!);
    const author = await this.getAuthor(bookDto.authorId);
    if (author) bookBuilder.setAuthor(author);
    return bookBuilder.getBook() as ComicBook;
  }

  private async getAuthor(
    authorId: string | undefined,
  ): Promise<Author | null> {
    if (!authorId) return null;
    const id = Number(authorId);
    const author = await this.authorsRepository.findOneBy({
      id,
    });
    return author;
  }

  async setCacheKey(key: string, value: string): Promise<void> {
    await this.cacheManager.set(key, value, 10000);
  }

  async getCacheKey(key: string): Promise<string | undefined> {
    return await this.cacheManager.get(key);
  }
}
