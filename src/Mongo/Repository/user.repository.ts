import { Injectable } from "@nestjs/common";
import { InjectModel, InjectConnection } from "@nestjs/mongoose";
import { Model, Connection, ObjectId } from 'mongoose';
import { User } from "../Interfaces/user.interface";
import { CreateUserDto } from "../../DTO/createUser.dto";

@Injectable()
export class UserRepository {

    constructor(
        @InjectModel('user') private readonly userModel: Model<User>
    ){}
    
    async getAllUsers() : Promise<User[]>{
        return await this.userModel.find({}, { __v: false }).sort({ name : + 1}).exec();
    }

    async findById(UserID: string): Promise<User>{
        return await this.userModel.findById(UserID, { __v : false});
    }

    async saveUser(newUser : CreateUserDto): Promise<User>{
        const createdUser = new this.userModel(newUser);
        return createdUser.save();
    }

    async deleteUser(UserID: string): Promise<User>{
        return await this.userModel.findOneAndDelete({ _id : UserID});
    }

    updateUser(UserID: string, User: CreateUserDto)  {
        return this.userModel.replaceOne({ _id: UserID}, User);
    }

    async findUserByName(UserName: string): Promise<User[]> { 
        return await this.userModel.find({ name : { '$regex' : UserName, '$options' : 'i' } }, { __v : false});
    }
    async findUserByEmail(email: string): Promise<User[]> { 
        return await this.userModel.find({ email : { '$regex' : email, '$options' : 'i' } }, { __v : false});
    }

}