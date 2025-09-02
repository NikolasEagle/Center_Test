import { Controller, Get, Post } from '@nestjs/common';
import { BooksService } from './books.service';

import faker from '@gwinkamp/faker';
import { getRandomCountry } from 'countries-ts';
import randomTitle from 'random-title';
import { Types } from 'mongoose';

@Controller()
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  @Get()
  async getBooks() {
    return this.booksService.getBooks();
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
      const authorId = author._id instanceof Types.ObjectId && author._id;
      this.booksService.createBook(title, authorId.toString());
    }
    return 'Success!';
  }
}
