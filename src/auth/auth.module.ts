import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/Services/users/user.service';
import { UserRepository } from 'src/Mongo/Repository/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/Mongo/Schemas/user.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: 'user', schema: UserSchema}])
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, UserRepository]
})
export class AuthModule {}
