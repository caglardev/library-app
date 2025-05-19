import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// TODO create an author module and move this class there.
@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
