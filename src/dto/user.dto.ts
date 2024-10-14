
import { IsNotEmpty, MinLength, IsEmail, IsEnum, isEmpty, isBoolean, IsNumber, IsOptional, IsString, IsArray, ArrayMinSize , ValidateNested} from 'class-validator';
import { Type } from 'class-transformer';

enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

export class UserDto {
    @IsNotEmpty()
    readonly name: number;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;

    @IsNotEmpty()
    @IsEnum(Gender, {
        message: 'gender must be either male or female',
    })
    readonly gender: Gender;
}

export class UserEmailDto {

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
}


export class UserCreateDto {
    @IsNotEmpty()
    @MinLength(6)
    readonly username: string;

    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;

    @IsNotEmpty()
    @IsEmail()
    readonly emailid: string;

    @IsNumber()
    readonly roleid : number

    @IsOptional()
    @IsString()
    readonly mobileno : string

    @IsNumber()
    readonly userstatus :number

    @IsOptional()
    @IsString()
    readonly fullname : string

    @IsNumber()
    readonly title : number
    
    @IsArray()
    sub_menu_ids: any

    @IsArray()
    @ArrayMinSize(1)
    menu_ids: any

}

export class UserApproveDto {
    
    @IsNotEmpty()
    readonly username: string;

    @IsNumber()
    readonly action_id : number

}

export class UpdateUserCreateDto {

    @IsNotEmpty()
    @MinLength(6)
    readonly username: string;

    @IsNotEmpty()
    @IsEmail()
    readonly emailid: string;

    @IsNumber()
    readonly roleid : number

    @IsOptional()
    @IsString()
    readonly mobileno : string

    @IsNumber()
    readonly userstatus :number

    @IsNotEmpty()
    @IsString()
    readonly fullname : string

    @IsNumber()
    readonly title : number

    @IsArray()
    sub_menu_ids: any

    @IsArray()
    @ArrayMinSize(1)
    menu_ids: any

}

export class DeleteUserCreateDto {
    
    @IsNotEmpty()
    readonly username: string;

}