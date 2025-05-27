/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from '../service/book.service';
import { BookDto } from '../dto/book.dto';

const createBookDto: BookDto = {
  name: 'book 1',
  authorId: '1',
};

//TODO: add tests for edge cases.
describe('Books Controller', () => {
  let bookController: BookController;
  let bookService: BookService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        BookService,
        {
          provide: BookService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                id: '1',
                name: 'book 1',
                authors: [
                  {
                    id: '1',
                    name: 'author 1',
                  },
                ],
              },
              {
                firstName: '2',
                lastName: 'book 2',
              },
            ]),
            findOne: jest.fn().mockImplementation(() =>
              Promise.resolve({
                id: '1',
                name: 'book 1',
                authors: [
                  {
                    id: '1',
                    name: 'author 1',
                  },
                ],
              }),
            ),
            create: jest
              .fn()
              .mockImplementation((createBookDto: BookDto) =>
                Promise.resolve({ id: '1', ...createBookDto }),
              ),
            remove: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();
    bookController = app.get<BookController>(BookController);
    bookService = app.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(bookController).toBeDefined();
  });

  it('should find all books ', () => {
    bookController.findAll();
    expect(bookService.findAll).toHaveBeenCalled();
  });

  it('should find a book', () => {
    expect(bookController.findOne(1)).resolves.toEqual({
      id: '1',
      name: 'book 1',
      authors: [
        {
          id: '1',
          name: 'author 1',
        },
      ],
    });
    expect(bookService.findOne).toHaveBeenCalled();
  });

  it('should create a book', () => {
    bookController.create(createBookDto);
    expect(bookController.create(createBookDto)).resolves.toEqual({
      id: '1',
      ...createBookDto,
    });
    expect(bookService.create).toHaveBeenCalledWith(createBookDto);
  });

  it('should remove the book', () => {
    bookController.remove(1);
    expect(bookService.remove).toHaveBeenCalled();
  });

  it('should update the book', () => {
    bookController.update(1, { name: 'book 1X' });
    expect(bookService.update).toHaveBeenCalled();
  });
});
