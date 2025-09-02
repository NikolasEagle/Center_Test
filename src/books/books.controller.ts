import { Controller, Get, Post, Query } from '@nestjs/common';
import { BooksService } from './books.service';

import faker from '@gwinkamp/faker';
import { getRandomCountry } from 'countries-ts';
import randomTitle from 'random-title';
import { Book } from './schemas/book.schema';
import { Types } from 'mongoose';

@Controller()
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getBooks(@Query('page') page: string) {
    if (page && typeof Number(page) === 'number' && Number(page) > 0) {
      const pageNumber = parseInt(page, 10) || 1;
      const limitNumber = 5;

      return this.booksService.paginateBooks(pageNumber, limitNumber);
    } else {
      return {
        error: 'Missing parameter - page',
      };
    }
  }
  @Post('generateAuthors')
  async generateAuthors() {
    for (let i = 1; i <= 250; i++) {
      const name = faker.person.fullNameString();

      const country = getRandomCountry().label;

      this.booksService.createAuthor(name, country);
    }
    return 'Success!';
  }
  @Post('generateBooks')
  async generateBooks() {
    const authors = await this.booksService.getAuthors();
    for (let author of authors) {
      const title = randomTitle({ words: 4 });
      const authorId: Book['author'] =
        author._id instanceof Types.ObjectId && typeof author._id !== 'boolean'
          ? author._id
          : new Types.ObjectId();
      this.booksService.createBook(title, authorId);
    }
    return 'Success!';
  }
}
