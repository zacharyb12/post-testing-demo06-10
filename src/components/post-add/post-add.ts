import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../services/post-service';
import { AddPost } from '../../models/add-post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-add',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './post-add.html',
  styleUrl: './post-add.css'
})
export class PostAdd {

  newPost : FormGroup;

  private fb  = inject(FormBuilder);
  private postService = inject(PostService);
  private router = inject(Router);

constructor(){
  this.newPost = this.fb.group({
    title : ['',[Validators.required]],
    author : ['',[Validators.required]],
    content : ['',[Validators.required]]
  })
}


addPost(){
  if(this.newPost.valid){

    const postAdd : AddPost = this.newPost.value;

    this.postService.addPost(postAdd).subscribe({
      next : (response) => {
        this.router.navigate(['/']);
      },
      error : (err) => {
        console.error('Error adding post:', err);
      }
      })
  }
}

}
