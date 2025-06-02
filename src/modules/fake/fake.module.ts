import { Module } from '@nestjs/common';
import { FakeController } from './controller/fake.controller';

@Module({
  controllers: [FakeController],
  providers: [],
})
export class FakeModule {}
