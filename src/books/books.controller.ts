import { Controller, Get, Post } from '@nestjs/common';
import { BooksService } from './books.service';

import faker from '@gwinkamp/faker';

import { getRandomCountry } from 'countries-ts';

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
}
