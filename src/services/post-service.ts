import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AddPost } from '../models/add-post.model';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  private url = 'http://localhost:3000/posts';

  private readonly http = inject(HttpClient);

  getPosts(){
    return this.http.get<Post[]>(this.url);
  }

  getPostById(id: string){
    return this.http.get<Post>(`${this.url}/${id}`);
  }

  addPost(post : AddPost){
    const newPost : Post = {
      ...post,
      id : Math.floor(Math.random() * 1000).toString()
    }
    return this.http.post<Post>(this.url, newPost);
  }

  deletePost(id: string){
 return this.http.delete(`${this.url}/${id}`);
  }

  updatePost( post : Post){
    return this.http.put<Post>(`${this.url}/${post.id}`, post);
  }

}
