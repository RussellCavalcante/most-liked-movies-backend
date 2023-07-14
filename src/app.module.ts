import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './Mongo/Schemas/user.schema';
import { UserController } from './Controllers/users/user.controller';
import { UserService } from './Services/users/user.service';
import { UserRepository } from './Mongo/Repository/user.repository';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://russell:0528@cluster0.kcg6lzk.mongodb.net/most-liked-movies?retryWrites=true&w=majority'),
    MongooseModule.forFeature([
      {name: 'user', schema: UserSchema}]),
    AuthModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class AppModule {}
