import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  ChildEntity,
  TableInheritance,
  OneToMany,
} from 'typeorm';
import { Author } from '../../author/entity/author.entity';
import { Borrow } from 'src/modules/borrow/entity/borrow.entity';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Author, (author) => author.books)
  @JoinColumn()
  author: Author;

  @OneToMany(() => Borrow, (borrow) => borrow.book)
  borrows: Borrow[];
}
@ChildEntity()
export class ComicBook extends Book {
  @Column()
  amountOfPictures: number;
}
