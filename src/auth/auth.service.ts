import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/Mongo/Interfaces/user.interface';
import { LoginDto } from './dtos/login.dto';
import { UserService } from 'src/Services/users/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService
    ){}

    async login(loginDto: LoginDto): Promise<User>{
        const user: User | undefined = await this.userService.findUserByEmail(loginDto.email).catch(()=> undefined)
        
        const isMatch = await bcrypt.compare(loginDto.password, user[0]?.password || '');
        
        if (!user || !isMatch ){
            throw new NotFoundException('Email or password invalid')
        }

        return user
    }
}
