import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Book } from 'src/modules/book/entity/book.entity';
import { SearchService } from '../service/search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('book')
  async search(@Query('query') query: string): Promise<Book[]> {
    if (!query) {
      throw new HttpException(
        'Query parameter is required',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.searchService.search(query);
  }
}
