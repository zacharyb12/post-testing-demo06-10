import { Component, inject, signal } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post-service';
import { Router } from '@angular/router';
import { PostAdd } from "../post-add/post-add";

@Component({
  selector: 'app-post-list',
  imports: [PostAdd],
  templateUrl: './post-list.html',
  styleUrl: './post-list.css'
})
export class PostList {

  posts : Post[] = []

  private readonly postService = inject(PostService);
  private readonly router = inject(Router);

constructor(){
  this.getPosts();
}

  getPosts(){
    this.postService.getPosts().subscribe({

      next : (response) => {
        this.posts = response;
      },

      error : (error) => {
        console.error('Error fetching posts:', error);
      }
    })
  }

  navigateToDetails(postId: string) {
    if(postId.includes('admin')){
      throw new Error('Invalid post ID');
    }
    this.router.navigate(['/post-detail', postId]);
  }

  
}
