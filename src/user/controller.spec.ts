import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";


describe('Controller', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {  // It runs before each individual test case , The async keyword is used to tell JavaScript that this function will perform some tasks that take time, like fetching data from a server
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService, // inject the service
          useValue: {
            create: jest.fn(),
            findAll:jest.fn(), 
            findOne:jest.fn(),
            update:jest.fn(),
            remove:jest.fn()
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  describe('get All Data', () => {
    test('should return Create Data', async () => {
        const dto:CreateUserDto = { name:"shivani", address:"chandigarh", pincode:123456 };
        const result = {id:1 , ...dto}
        jest.spyOn(service, 'create').mockResolvedValue(result)
        expect(await controller.create(dto)).toBe(result)
    });
  });

  test('should get all items', async () => {
    const dto: CreateUserDto = { name: "shivani", address: "chandigarh", pincode: 123456 };
    const result = [{ id: 1, ...dto }];
    jest.spyOn(service, 'findAll').mockResolvedValue(result); // Mock findAll to return an array
    const items = await service.findAll(); // Await the promise
  
    expect(items).toEqual(result); // Check if the result matches the expectation
  });

  test('should get one item', async () => {
    const dto:CreateUserDto = { name : "shivani", address: "chandigarh", pincode: 123456 };
    const result = { id:1, ...dto};
    jest.spyOn(service , "findOne").mockResolvedValue(result);
    expect(await controller.findOne("1")).toBe(result);
  })

  test('should update one item', async () => {
    const dto:CreateUserDto = { name : "shivani", address: "chandigarh", pincode: 123456 };
    const result = { id:1, ...dto};
    jest.spyOn(service , "update").mockResolvedValue(result);  
    expect(await controller.update("1",dto)).toBe(result);
  })

  // test('should delete one item', async () => {
  //   const dto: CreateUserDto = { name: "shivani", address: "chandigarh", pincode: 123456 };
  //   const result = { id: 1, ...dto };
  //   jest.spyOn(service, "remove").mockResolvedValue(result);
  //   expect(await controller.remove("1")).toEqual(result); // Use toEqual for deep equality check
  // });
});  

