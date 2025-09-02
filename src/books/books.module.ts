import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksService } from './books.service';
import { Book, BookSchema } from './schemas/book.schema';
import { Author, AuthorSchema } from './schemas/author.schema';
import { BooksController } from './books.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: Author.name, schema: AuthorSchema },
    ]),
  ],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}
