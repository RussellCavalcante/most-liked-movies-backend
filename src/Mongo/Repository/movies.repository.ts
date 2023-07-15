import { Injectable } from "@nestjs/common";
import { InjectModel, InjectConnection } from "@nestjs/mongoose";
import { Model, Connection, ObjectId } from 'mongoose';
import { Movie } from "../Interfaces/movies.interface";
import { MoviesDto } from "../../movies/dtos/movies.dto";

@Injectable()
export class MovieRepository {

    constructor(
        @InjectModel('movie') private readonly MovieModel: Model<Movie>
    ){}
    
    async getAllMovies() : Promise<Movie[]>{
        return await this.MovieModel.find({}, { __v: false }).sort({ name : + 1}).exec();
    }

    async findById(MovieID: string): Promise<Movie>{
        return await this.MovieModel.findById(MovieID, { __v : false});
    }

    async saveMovie(newMovie : MoviesDto): Promise<Movie>{
        const createdMovie = new this.MovieModel(newMovie);
        return createdMovie.save();
    }

    async deleteMovie(MovieID: string): Promise<Movie>{
        return await this.MovieModel.findOneAndDelete({ _id : MovieID});
    }

    updateMovie(MovieID: string, Movie: MoviesDto)  {
        return this.MovieModel.replaceOne({ _id: MovieID}, Movie);
    }

    async findMovieByName(MovieName: string): Promise<Movie[]> { 
        return await this.MovieModel.find({ name : { '$regex' : MovieName, '$options' : 'i' } }, { __v : false});
    }
    async findMovieByEmail(email: string): Promise<Movie[]> { 
        return await this.MovieModel.find({ email : { '$regex' : email, '$options' : 'i' } }, { __v : false});
    }

}