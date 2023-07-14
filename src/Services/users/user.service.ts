import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../DTO/createUser.dto';
import { User } from '../../Mongo/Interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../Mongo/Repository/user.repository'

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository : UserRepository
    ){}

    // private users: User[] = []

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const saltOrRounds = 10;
        const passwordHashed = await bcrypt.hash(createUserDto.password, saltOrRounds);
        
        const user: CreateUserDto = {
            ...createUserDto,
            password: passwordHashed
        }

        return await this.userRepository.saveUser(user)
    }

    async saveUser(newUser: CreateUserDto) : Promise<User> {
        return await this.userRepository.saveUser(newUser)
    }

    async getAllUser(): Promise<User[]>{
        return await this.userRepository.getAllUsers()
    }


    async findUserByEmail(email: string) : Promise<User[]> {
        return this.userRepository.findUserByEmail(email);
    }
}
