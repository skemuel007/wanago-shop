import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class RegisterDto {
    @ApiProperty({
        description: 'Email property'
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Name property'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        deprecated: true,
        description: 'Use the name property instead'
    })
    fullName: string;

    @ApiProperty({
        description: 'Password property'
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    password: string;

    @ApiProperty({
        description: 'Has to match a regular express: /^\\+[1-9]\\d{1,14}$/',
        example: '+1232123433433'
    })
    @IsString()
    @IsEmail()
    @Matches(/^\+[1-9]\d{1,14}$/)
    phoneNumber: string;
}
