import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  ChildEntity,
  TableInheritance,
} from 'typeorm';
import { Author } from '../../author/entity/author.entity';

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
}
@ChildEntity()
export class ComicBook extends Book {
  @Column()
  amountOfPictures: number;
}
