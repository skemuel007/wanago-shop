import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LogInDto {

    @ApiProperty({
        description: 'Email property'
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Password property'
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    password: string;
}
