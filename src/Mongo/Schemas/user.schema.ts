import { Schema } from 'mongoose';

export const UserSchema = new Schema({
    name : String,
    email: String,
    phone: Number,
    cpf: String,
    password: String

})
