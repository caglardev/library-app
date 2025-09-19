import { Book } from '../entity/book.entity';
import { Author } from '../../author/entity/author.entity';
import { ComicBook } from '../entity/book.entity';

interface IBookBuilder {
  book: Book;
  id(id: number): this;
  name(name: string): this;
  author(author: Author): this;
  build(): Book;
}

export class BookBuilder implements IBookBuilder {
  book: Book;

  constructor() {
    this.book = new Book();
  }

  id(id: number): this {
    this.book.id = id;
    return this;
  }

  name(name: string): this {
    this.book.name = name;
    return this;
  }

  author(author: Author): this {
    this.book.author = author;
    return this;
  }

  build(): Book {
    return this.book;
  }
}

export class ComicBookBuilder extends BookBuilder {
  setAmountOfPictures(amountOfPictures: number): this {
    (this.book as ComicBook).amountOfPictures = amountOfPictures;
    return this;
  }
}
