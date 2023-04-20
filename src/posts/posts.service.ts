import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Posts } from './posts.interface';
import { UpdatePostDto } from './dto/update-post.dto';
import { mapper } from 'src/shared/mapper';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
    private lastPostId = 0;
    private posts: Posts[] = [];

    getAllPosts() {
        return this.posts;
    }

    getPostById(id: number) {
        const post = this.posts.find(post => post.id == id);
        if (post)
            return post;
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    replacePost(id: number, post: UpdatePostDto) {
        const postIndex = this.posts.findIndex(post => post.id === id);
        if (postIndex > -1)
        {
            const newPost = mapper<Posts, UpdatePostDto>(post);
            this.posts[postIndex] = newPost;

            return post;
        }

        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    createPost(post: CreatePostDto) {
        const newPost = {
            id: ++this.lastPostId,
            ...post
        };
        this.posts.push(newPost);
        return newPost;
    }

    deletePost(id: number) {
        const postIndex = this.posts.findIndex(post => post.id === id);
        if (postIndex > -1)
        {
            this.posts.slice(postIndex, 1);
        } else {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
    }
}
