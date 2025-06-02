import { Book } from '../entity/book.entity';
import { Author } from '../../author/entity/author.entity';
import { ComicBook } from '../entity/book.entity';

interface IBookBuilder {
  book: Book;
  setId(id: number): this;
  setName(name: string): this;
  setAuthor(author: Author): this;
  getBook(): Book;
}

export class BookBuilder implements IBookBuilder {
  book: Book;

  constructor() {
    this.book = new Book();
  }

  setId(id: number): this {
    this.book.id = id;
    return this;
  }

  setName(name: string): this {
    this.book.name = name;
    return this;
  }

  setAuthor(author: Author): this {
    this.book.author = author;
    return this;
  }

  getBook(): Book {
    return this.book;
  }
}

export class ComicBookBuilder extends BookBuilder {
  setAmountOfPictures(amountOfPictures: number): this {
    (this.book as ComicBook).amountOfPictures = amountOfPictures;
    return this;
  }
}
