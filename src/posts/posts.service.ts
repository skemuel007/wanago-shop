import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Posts } from './posts.interface';
import { UpdatePostDto } from './dto/update-post.dto';
import { mapper } from 'src/shared/mapper';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Post from './post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
    private lastPostId = 0;
    private posts: Posts[] = [];

    constructor(
        @InjectRepository(Post)
        private postsRepository: Repository<Post>
    ) {}

    getAllPosts() {
        return this.postsRepository.find();
    }

    getPostById(id: number) {
        const post = this.postsRepository.findOne({
            where: {id: id}
        });
        if (post)
            return post;
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    async updatePost(id: number, post: UpdatePostDto) {
        const postToUpdate = mapper<Posts, UpdatePostDto>(post);
        
        await this.postsRepository.update(id, postToUpdate);
        const updatedPost = await this.postsRepository.findOne({
            where: {id: id}
        });

        if (updatedPost) {
            return updatedPost;
        }

        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    async createPost(post: CreatePostDto) {
        const newPost = this.postsRepository.create(post);
        await this.postsRepository.save(newPost);
        return newPost;
    }

    async deletePost(id: number) {
        const deleteResponse = await this.postsRepository.delete(id);
        if (!deleteResponse.affected)
        {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
    }
}
