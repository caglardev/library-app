import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from '../entity/book.entity';
import { Repository } from 'typeorm';
import { Author } from '../../author/entity/author.entity';

//TODO: add tests for edge cases.
describe('BookService', () => {
  let bookService: BookService;
  let bookRepository: Repository<Book>;
  let authorRepository: Repository<Author>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getRepositoryToken(Book),
          useValue: {
            find: jest.fn().mockResolvedValue([
              {
                id: 1,
                name: 'Book 1',
                authors: [{ id: 1, name: 'Author 1' }],
              },
            ]),
            findOne: jest.fn().mockResolvedValue({
              id: 1,
              name: 'Book 1',
              authors: [{ id: 1, name: 'Author 1' }],
            }),
            save: jest.fn().mockResolvedValue({
              id: 1,
              name: 'Book 1',
              authors: [{ id: 1, name: 'Author 1' }],
            }),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Author),
          useValue: {
            findByIds: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    bookService = module.get<BookService>(BookService);
    bookRepository = module.get<Repository<Book>>(getRepositoryToken(Book));
    authorRepository = module.get<Repository<Author>>(
      getRepositoryToken(Author),
    );
  });

  it('should be defined', () => {
    expect(bookRepository).toBeDefined();
    expect(authorRepository).toBeDefined();
    expect(bookService).toBeDefined();
  });

  it('findAll', async () => {
    const books = await bookService.findAll();
    expect(books).toStrictEqual([
      { id: 1, name: 'Book 1', authors: [{ id: 1, name: 'Author 1' }] },
    ]);
  });

  it('findOne', async () => {
    const repoSpy = jest.spyOn(bookRepository, 'findOne');
    const book = await bookService.findOne(1);

    expect(repoSpy).toBeCalledWith({
      where: { id: 1 },
      relations: ['authors'],
    });
    expect(book).toStrictEqual({
      id: 1,
      name: 'Book 1',
      authors: [{ id: 1, name: 'Author 1' }],
    });
  });

  it('create', async () => {
    const book = await bookService.create({ name: 'Book 1', authorId: '1' });
    expect(book).toStrictEqual({
      id: 1,
      name: 'Book 1',
      authors: [{ id: 1, name: 'Author 1' }],
    });
  });

  it('remove', async () => {
    const repoSpy = jest.spyOn(bookRepository, 'delete');
    await bookService.remove(1);
    expect(repoSpy).toBeCalledWith(1);
  });

  it('update', async () => {
    const repoSpy = jest.spyOn(bookRepository, 'save');
    await bookService.update(1, {
      name: 'Book 1',
      authorId: '1',
    });
    expect(repoSpy).toBeCalledWith({
      id: 1,
      name: 'Book 1',
      authors: [{ id: 1, name: 'Author 1' }],
    });
  });
});
