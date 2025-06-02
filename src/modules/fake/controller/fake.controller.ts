import { Controller, Get } from '@nestjs/common';

@Controller('create-fake-data')
export class FakeController {
  constructor() {}

  @Get()
  getFakeData(): string {
    return 'fake data created';
  }
}
