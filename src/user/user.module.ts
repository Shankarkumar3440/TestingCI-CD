import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { userValidate } from './Validation/user.pipes';
import { UserRepository } from './repository';

@Module({
  imports:[TypeOrmModule.forFeature([User,UserRepository])],
  controllers: [UserController],
  providers: [UserService,userValidate],
  exports:[UserService,UserRepository]
})
export class UserModule {}
