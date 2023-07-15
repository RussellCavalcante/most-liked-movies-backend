import { Schema } from 'mongoose';

export const MovieSchema = new Schema({
    id_movie : String,
    original_language: String,
    original_title: String,
    overview: String,
    title: String,
    vote_average: Number,
    vote_count: Number,
    poster_path: String    
})
