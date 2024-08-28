import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository:UserRepository){}

  async create(createUserDto: CreateUserDto): Promise<User> {
    let user:User = new User();
    user.name = createUserDto.name;
    user.address = createUserDto.address;
    user.pincode = createUserDto.pincode;
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  findOne(id: any):Promise<User> {
     const user = this.userRepository.findOne({where :{id:id}});
     if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
     }else
     {
      return user
     }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = await this.findOne(id);
    if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
    }
    user.name = updateUserDto.name;
    user.address = updateUserDto.address;
    user.pincode = updateUserDto.pincode;

    return await this.userRepository.save(user);
}

async remove(id: number): Promise<User> {
  const user = await this.userRepository.findOne({where :{id}});
  if (!user) {
    throw new NotFoundException(`User with ID ${id} not found`);
  }
   await this.userRepository.remove(user);
  return user;
}
  }

