import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './Mongo/Schemas/user.schema';
import { UserController } from './Controllers/users/user.controller';
import { UserService } from './Services/users/user.service';
import { UserRepository } from './Mongo/Repository/user.repository';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { BooksService } from './Services/books/books.service';
import { BookRepository } from './Mongo/Repository/book.repository';
import { BooksController } from './Controllers/books/books.controller';
import { BookSchema } from './Mongo/Schemas/book.schema';
import { JwtModule } from '@nestjs/jwt';
import { MoviesModule } from './movies/movies.module';
import { MovieSchema } from './Mongo/Schemas/movie.schema';
import { MovieRepository } from './Mongo/Repository/movies.repository';
import { MoviesService } from './movies/movies.service';



@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://russell:0528@cluster0.kcg6lzk.mongodb.net/most-liked-movies?retryWrites=true&w=majority'),
    MongooseModule.forFeature([
      {name: 'user', schema: UserSchema},
      {name: 'books', schema: BookSchema},
      {name: 'movie', schema: MovieSchema}]),
    AuthModule,
    JwtModule,
    MoviesModule
  ],
  controllers: [UserController, BooksController,],
  providers: [UserService, UserRepository, BooksService, BookRepository, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
})
export class AppModule {}
