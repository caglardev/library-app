import { Book } from 'src/modules/book/entity/book.entity';
import { User } from 'src/modules/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Borrow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.borrows)
  user: User;

  @ManyToOne(() => Book, (book) => book.borrows)
  book: Book;

  @Column()
  borrowedAt: Date;

  @Column({ nullable: true })
  returnedAt: Date;
}
