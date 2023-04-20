import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty({
        type: String
    })
    content: string;
    @ApiProperty()
    title: string;
}
