import { Component, inject } from '@angular/core';
import { Post } from '../../models/post.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../services/post-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-update',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './post-update.html',
  styleUrl: './post-update.css'
})
export class PostUpdate {

updateForm : FormGroup;

postToUpdate : Post | null  = null;
id : string | null  = null;

private readonly postService = inject(PostService);
private readonly router = inject(Router);
private readonly activatedRoute = inject(ActivatedRoute);
private readonly fb  = inject(FormBuilder)

constructor() {
  // recuperation de l'id dans l'url
this.id = this.activatedRoute.snapshot.params['id'];

// Recuperation du post
this.getPost();

// Creation du formulaire
this.updateForm = this.fb.group({
  title: ['' , Validators.required],
  content : ['', Validators.required]
})

  }

  getPost(){
    if(this.id){
      this.postService.getPostById(this.id).subscribe({
        next : (post) => {
          this.postToUpdate = post;

          // initialisation du formulaire avec les valeurs du post quand il est recupere
           this.updateForm.patchValue(this.postToUpdate);
        },
        error : (err) => {
          console.error('Error fetching post:', err);
        }
      })
    }
  }

  updatePost(){
    if(this.id && this.updateForm.valid && this.postToUpdate){

      this.postToUpdate.title = this.updateForm.value.title;
      this.postToUpdate.content = this.updateForm.value.content;

      this.postService.updatePost(this.postToUpdate).subscribe({

        next : () => {
          this.router.navigate(['/']);
        },
        error : (err) => {
          console.error('Error updating post:', err);
        }
      })
  }

  }

  deletePost(){

    if(this.id && this.postToUpdate){
      this.postService.deletePost(this.id).subscribe({
        next : () => {
          this.router.navigate(['/']);
        },
        error : (err) => {
          console.error('Error deleting post:', err);
        }
      })
    }
  }
}

