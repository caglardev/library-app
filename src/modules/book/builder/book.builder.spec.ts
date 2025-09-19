import { BookBuilder } from './book.builder';
import { Book } from '../entity/book.entity';
import { Author } from '../../author/entity/author.entity';

describe('BookBuilder', () => {
  let bookBuilder: BookBuilder;

  beforeEach(() => {
    bookBuilder = new BookBuilder();
  });

  it('should create a new BookBuilder instance', () => {
    expect(bookBuilder).toBeInstanceOf(BookBuilder);
  });

  it('should set id correctly', () => {
    const book = bookBuilder.id(1).build();
    expect(book.id).toBe(1);
  });

  it('should set name correctly', () => {
    const book = bookBuilder.name('Test Book').build();
    expect(book.name).toBe('Test Book');
  });

  it('should set authors correctly', () => {
    const authors: Author[] = [
      { id: 1, name: 'Author 1' },
      { id: 2, name: 'Author 2' },
    ];
    const book = bookBuilder.author(authors).build();
    expect(book.authors).toEqual(authors);
  });

  it('should return a Book instance', () => {
    const book = bookBuilder.build();
    expect(book).toBeInstanceOf(Book);
  });

  it('should allow method chaining', () => {
    const authors: Author[] = [{ id: 1, name: 'Author 1' }];
    const book = bookBuilder.id(1).name('Test Book').author(authors).build();

    expect(book.id).toBe(1);
    expect(book.name).toBe('Test Book');
    expect(book.authors).toEqual(authors);
  });
});
