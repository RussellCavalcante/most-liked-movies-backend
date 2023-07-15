import { Controller, Get, Post, Body, Delete, Param, Patch } from '@nestjs/common';
import { MoviesDto } from '../movies/dtos/movies.dto';
import { Movie } from 'src/Mongo/Interfaces/movies.interface';
import { MoviesService } from 'src/movies/movies.service';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/enum/user-type.enum';

@Roles(UserType.User)
@Controller('movies')
export class MoviesController {

    constructor(
        private readonly moviesService : MoviesService
    ) {}
    
    
    
    @Get()
    getAllmovies(): Promise<Movie[]> {
        return this.moviesService.getAllMovies();
    }

    @Get(':movieID')
    async getmovieById(@Param('movieID') movieID: string) {
        return await this.moviesService.getMovieById(movieID);
    }


    @Get('name/:movieName')
    async getmovieByName(@Param('movieName') movieName: string) {
        return await this.moviesService.getMovieByName(movieName);
    }

    @Post()
    async savemovie(@Body() newmovie : MoviesDto): Promise<Movie>{
        return this.moviesService.saveMovie(newmovie)
    }

    @Delete(':movieID')
    async deletemovie(@Param('movieID') movieID: string) {
        return await this.moviesService.deleteMovie(movieID);
    }

    @Patch(':movieID')
    async updatemovie(@Param('movieID') movieID: string, @Body() movie: MoviesDto) {
        return await this.moviesService.updateMovie(movieID, movie);
    }

}
