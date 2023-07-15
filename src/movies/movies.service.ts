import { Injectable, BadRequestException } from '@nestjs/common';
import { promises } from 'fs';
import { MoviesDto } from '../movies/dtos/movies.dto';
import { Movie } from 'src/Mongo/Interfaces/movies.interface';
import { MovieRepository } from 'src/Mongo/Repository/movies.repository';


@Injectable()
export class MoviesService {

    constructor(
        private readonly MovieRepository : MovieRepository
    ){}
    
    async getAllMovies(): Promise<Movie[]> {
        const allMovies = await this.MovieRepository.getAllMovies();
        
        if(!allMovies.length)
            throw new BadRequestException('There are no Movies registered yet');
        else
            return allMovies;

    }

    async getMovieById(MovieID: string) : Promise<Movie> {
        
        try{
            return await this.MovieRepository.findById(MovieID);
        } catch(e){
            throw new BadRequestException('This Movie does not exist');
        }


    }

    

    async saveMovie(newMovie: MoviesDto) : Promise<Movie> {
        return await this.MovieRepository.saveMovie(newMovie)
    }


    async deleteMovie(MovieID: string) {

        try{
            const MovieExists = await this.MovieRepository.findById(MovieID);
            
            if(MovieExists){
                const deletedMovie = await this.MovieRepository.deleteMovie(MovieID);

                if(deletedMovie)
                    return 'This Movie was deleted successfully';

            } else {
                throw new BadRequestException('This Movie does not exist');
            }

        } catch(e) {
            throw new BadRequestException('This Movie does not exist');
        }

    }

    async updateMovie(MovieID: string, Movie: MoviesDto) {
        
        try{
            const MovieExists = await this.MovieRepository.findById(MovieID);

            if(MovieExists){
                const updatedMovie = await this.MovieRepository.updateMovie(MovieID, Movie);

                if(updatedMovie)
                    return 'This Movie was updated successfully';

            } else {
                throw new BadRequestException('This Movie does not exist');
            }

        } catch(e) {
            throw new BadRequestException('This Movie does not exist');
        }

    }

    async getMovieByName(MovieName: string) : Promise<Movie[]> {
        return this.MovieRepository.findMovieByName(MovieName);
    }
    
}
