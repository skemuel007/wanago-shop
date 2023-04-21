import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdatePostDto {
    @IsNumber()
    @IsOptional()
    id: Number;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    content: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    title: string;
}
