import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthenticationGuard } from 'src/authentication/jwt-authentication.guard';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService
    ) {}

    @Get()
    @ApiResponse({ status: 200, description: 'Post data successfully retrieved'})
    getAllPosts() {
        return this.postsService.getAllPosts();
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: ''})
    @ApiResponse({ status: 404, description: 'Post not found'})
    getPostById(@Param('id') id: string) {
        return this.postsService.getPostById(Number(id));
    }

    @Post()
    @UseGuards(JwtAuthenticationGuard)
    @ApiResponse({ status: 201, description: 'The post record has been successfully created.'})
    async createPost(@Body() post: CreatePostDto) {
        return this.postsService.createPost(post);
    }

    @Put(':id')
    @ApiResponse({ status: 200, description: ''})
    @ApiResponse({ status: 404, description: 'Post not found'})
    async replacePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
        return this.postsService.updatePost(Number(id), post);
    }

    @Delete(':id')
    @ApiResponse({ status: 204, description: ''})
    @ApiResponse({ status: 404, description: 'Post not found'})
    async deletePost(@Param('id') id: string) {
        this.postsService.deletePost(Number(id));
    }
}
