import { Component, inject } from '@angular/core';
import { Post } from '../../models/post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post-service';

@Component({
  selector: 'app-post-details',
  imports: [],
  templateUrl: './post-details.html',
  styleUrl: './post-details.css'
})

export class PostDetails {

post : Post | undefined = undefined;

id : string | undefined = undefined;

private readonly activRoute = inject(ActivatedRoute)
private readonly router = inject(Router);
private readonly postService = inject(PostService);

constructor(){
  this.id = this.activRoute.snapshot.params['id'];
  this.getPost();

}

getPost(){
  if(this.id){
this.postService.getPostById(this.id).subscribe({
  next : (response) => {
    this.post = response;
  },
  error : (err) => {
    console.error('Error fetching post by id:',err);
    
  }})
  }
}

navigateToUpdate(id : string){
  this.router.navigate(['/post-update', id]);
}

deletePost(id : string){
this.postService.deletePost(id).subscribe({
  next : (response) => {
    this.router.navigate(['/']);
  },
  error : (err) => {
    console.log('Error deleting post:', err);
  }
})
}

}
