    import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
    import { CreateUserDto } from "../dto/create-user.dto";
    import { plainToClass } from "class-transformer";
    import { validate } from "class-validator";


    @Injectable()
    export class userValidate implements PipeTransform{
       async transform(value: any) {
            // try{
            // const obj = value.UpperCase()
            // return obj
            // }catch{
            //     throw new Error('Please Enter Upper Case')
            // } 
            
            // const val = parseInt(value, 10);
            // if (isNaN(val) || val <= 0) {
            //   throw new BadRequestException('Validation failed: ID must be a positive integer.');
            // }
            // return val; 
           
            const validUser = validate(value);
            console.log('validUser:', validUser); // Debugging output
            if (!validUser) {
                throw new Error("Enter valid id");
            } else {
                return value;
            }
        }            
            
        }

    

