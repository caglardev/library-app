INSERT INTO author (name) VALUES 
('J.K. Rowling'),
('George R.R. Martin'),
('J.R.R. Tolkien'),
('Stephen King'),
('Agatha Christie'),
('Ernest Hemingway'),
('Jane Austen'),
('Mark Twain'),
('Charles Dickens'),
('F. Scott Fitzgerald');

INSERT INTO book (name) VALUES
('1984'),
('Brave New World'),
('Harry Potter and the Philosopher''s Stone');

INSERT INTO book_authors_author ("bookId", "authorId") VALUES
(1, 1),  -- 1984 by George Orwell
(1, 2),  -- 1984 by Aldous Huxley
(2, 3);  -- Brave New World by J.K. Rowling
