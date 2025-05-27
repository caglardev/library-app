import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from '../author/entity/author.entity';
import { Book } from '../book/entity/book.entity';
import { SearchController } from './controller/search.controller';
import { SearchService } from './service/search.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
