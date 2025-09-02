import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';
import { Author } from './schemas/author.schema';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
    @InjectModel(Author.name) private authorModel: Model<Author>,
  ) {}

  async getBooks(): Promise<Book[]> {
    return this.bookModel.find().populate('author', 'name').exec();
  }

  async getAuthors(): Promise<Author[]> {
    return this.authorModel.find().exec();
  }
}
