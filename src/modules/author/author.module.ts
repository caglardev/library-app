import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entity/author.entity';

// TODO create service/contoller for authors path.
@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  controllers: [],
  providers: [],
})
export class AuthorModule {}
