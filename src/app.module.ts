import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './modules/book/entity/book.entity';
import { Author } from './modules/author/entity/author.entity';
import { BookModule } from './modules/book/book.module';
import { AuthorModule } from './modules/author/author.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Book, Author],
      synchronize: true,
    }),
    BookModule,
    AuthorModule,
  ],
})
export class AppModule {}
