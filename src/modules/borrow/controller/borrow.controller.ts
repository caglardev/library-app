import { Controller, Get } from '@nestjs/common';
import { BorrowService } from '../service/borrow.service';

@Controller('borrows')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Get()
  async findAll() {
    return await this.borrowService.findAll();
  }
}
