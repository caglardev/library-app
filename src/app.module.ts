import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book, ComicBook } from './modules/book/entity/book.entity';
import { Author } from './modules/author/entity/author.entity';
import { BookModule } from './modules/book/book.module';
import { AuthorModule } from './modules/author/author.module';
import { SearchModule } from './modules/search/search.module';
import { FakeModule } from './modules/fake/fake.module';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/user.entity';
import { BorrowModule } from './modules/borrow/borrow.module';
import { Borrow } from './modules/borrow/entity/borrow.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv, Keyv } from '@keyv/redis';
import { CacheableMemory } from 'cacheable';

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
      entities: [Book, ComicBook, Author, User, Borrow],
      synchronize: true,
    }),
    BookModule,
    AuthorModule,
    SearchModule,
    FakeModule,
    UserModule,
    BorrowModule,
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: () => {
        return {
          stores: [
            new Keyv({
              store: new CacheableMemory({ ttl: 10000, lruSize: 5000 }),
            }),
            createKeyv('redis://localhost:6379'),
          ],
        };
      },
    }),
  ],
})
export class AppModule {}
