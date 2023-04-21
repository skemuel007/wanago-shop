import { NotFoundException } from "@nestjs/common";

// export class PostNotFound extends HttpException {
export class PostNotFound extends NotFoundException {

    constructor(postId: number) {
        // super(`Post with id ${postId} not found`, HttpStatus.NOT_FOUND);
        super(`Post with id ${postId} not found`);
    }
}
