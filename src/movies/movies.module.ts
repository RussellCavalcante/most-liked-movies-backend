import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MovieRepository } from 'src/Mongo/Repository/movies.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/Mongo/Schemas/user.schema';
import { BookSchema } from 'src/Mongo/Schemas/book.schema';
import { MovieSchema } from 'src/Mongo/Schemas/movie.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {name: 'user', schema: UserSchema},
    {name: 'books', schema: BookSchema},
    {name: 'movie', schema: MovieSchema}]),],
  controllers: [MoviesController],
  providers: [MoviesService ,MovieRepository,]
})
export class MoviesModule {}
