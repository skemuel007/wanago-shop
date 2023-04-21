import { IsMongoId, IsNumberString } from "class-validator";

export class FindOnePrams {
    // @IsMongoId()
    @IsNumberString()
    id: string;
}
