import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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

  async createBook(title: string, authorId: Types.ObjectId): Promise<Book> {
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
  async paginateBooks(page = 1, limit = 5) {
    const skip = (page - 1) * limit;

    const data = await this.bookModel.aggregate([
      {
        $lookup: {
          from: 'authors',
          localField: 'author',
          foreignField: '_id',
          as: 'author',
        },
      },
      { $unwind: '$author' },
      {
        $project: {
          _id: 1,
          title: 1,
          author: '$author.name',
        },
      },
      { $skip: skip },
      { $limit: limit },
    ]);

    const totalCountAgg = await this.bookModel.aggregate([{ $count: 'total' }]);

    const totalCount = totalCountAgg[0]?.total || 0;
    const pagesCount = Math.ceil(totalCount / limit);

    return { books: data, totalCount, pagesCount };
  }
}
