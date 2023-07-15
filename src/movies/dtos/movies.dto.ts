export interface MoviesDto {
    readonly id_movie : string,
    readonly original_language: string,
    readonly original_title: string,
    readonly overview: string,
    readonly title: string,
    readonly vote_average: number,
    readonly vote_count: number
    readonly poster_path: string  
}