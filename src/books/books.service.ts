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

  async createBook(title: string, authorId: string): Promise<Book> {
    const book = new this.bookModel({ title, author: authorId });
    return book.save();
  }

  async getAuthors(): Promise<Author[]> {
    return this.authorModel.find().exec();
  }

  async createAuthor(name: string, country: string): Promise<Author> {
    const author = new this.authorModel({ name, country });
    return author.save();
  }
}
