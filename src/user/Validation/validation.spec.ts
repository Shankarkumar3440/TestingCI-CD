import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { userValidate } from './user.pipes';

jest.mock('class-validator', () => ({
  validate: jest.fn(),
}));

describe('userValidate Pipe', () => {
  let pipe: userValidate;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [userValidate],
    }).compile();

    pipe = module.get<userValidate>(userValidate);
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  it('should pass through valid data', async () => {
    const mockUser = { id: 1, name: 'John Doe', address: '123 Main St', pincode: 123456 };

    (validate as jest.Mock).mockResolvedValue([]); // Empty array means no validation errors

    const result = await pipe.transform(mockUser);
    expect(result).toEqual(mockUser);
    expect(validate).toHaveBeenCalledWith(mockUser);
  });
});
