import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRepository } from './repository';
import { User } from './entities/user.entity';

describe('UserService', () => {
  let service: UserService;
  let repository: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserRepository),
          useValue: {
            findOne: jest.fn(),
            findAll: jest.fn(),
            find:jest.fn(),
            update:jest.fn(),
            save:jest.fn()
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get(getRepositoryToken(UserRepository)) as jest.Mocked<UserRepository>;
  });

  test("User Create", async () => {
    const user: User = { id: 1, name: 'John', address: '123 Main St', pincode: 123456 } as User;
    repository.save.mockResolvedValue(user);
    expect(await service.create(user)).toEqual(user);
  })

  it('should return a user when user is found', async () => {
    const userId = 1; 
    const user: User = { id: userId, name: 'John Doe', address: '123 Main St', pincode: 123456 } as User;
    repository.findOne.mockResolvedValue(user); // Set up the mock to return the user object
    expect(await service.findOne(userId)).toEqual(user)
  });

  test("should be findAll User", async () => {
    const users: User[] =[{ id: 1, name: 'John', address: '123 Main St', pincode: 123456 }]
    repository.find.mockResolvedValue(users);
    expect(await service.findAll()).toEqual(users);
  })

  test("should update a User" , async () =>{
    const user: User = { id :1 , name: 'John', address: '123 Main St', pincode: 123456 }
    repository.findOne.mockResolvedValue(user),
    repository.save.mockResolvedValue(user);
    expect(await service.update("1",user)).toEqual(user)
  })
});
