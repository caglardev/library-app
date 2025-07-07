import { Module } from '@nestjs/common';
import { Borrow } from './entity/borrow.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({ imports: [TypeOrmModule.forFeature([Borrow])] })
export class BorrowModule {}
