import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '../../DTO/createUser.dto';
import { UserService } from '../../Services/users/user.service';
import { User } from '../../Mongo/Interfaces/user.interface';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get()
    async getAllUsers(): Promise<User[]>{
        return this.userService.getAllUser()

    }

    @Post()
    async createUser(@Body() createUser: CreateUserDto): Promise<User>{
        return this.userService.createUser(createUser)
        
    }
}
