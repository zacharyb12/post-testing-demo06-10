import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { PostService } from './post-service';
import { Post } from '../models/post.model';
import { AddPost } from '../models/add-post.model';

describe('PostService', () => {
  // instance du service
  let service: PostService;
  // instance du mock http
  let httpMock : HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Module pour mocker les appels http
      imports : [HttpClientTestingModule],
      // Service à tester
      providers : [PostService]
    });
    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // Vérification qu'il n'y a pas d'appel http en attente
  afterEach(() => {
    httpMock.verify();
  });

  // Test de création du service
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
  // Test de la méthode getPosts sans erreurs
 it('should fetch posts with no error',()=> {
  // Configuration :  Mock de données pour le test
  const mockPosts : Post[] =[
    { id: '1', title: 'Post 1', content: 'Content 1', author: 'Author 1' },
    { id: '2', title: 'Post 2', content: 'Content 2', author: 'Author 2' }
  ]

  // Appel de la méthode getPosts
  service.getPosts().subscribe(posts => {
    // Verifie le comportement de la méthode
    expect(posts.length).toBe(2);
    expect(posts).toEqual(mockPosts);
  });

  // Configuration : Simulation de la requête HTTP
  // verifie l'url de la requête
  const req = httpMock.expectOne('http://localhost:3000/posts');

  // Execution :  verifie la méthode de la requête
  expect(req.request.method).toBe('GET');

  // flush : envoie la reponse simulée
  req.flush(mockPosts);

 });


 // Test de la méthode getPosts avec erreur
 it('should fetch posts with error ',()=> {

  service.getPosts().subscribe({
    next : () => fail('Expected an error, not posts'),
    error : (error) => {

      expect(error.status).toBe(500);

    }
  })

  const req = httpMock.expectOne('http://localhost:3000/posts');

  req.flush(null, {status : 500, statusText : 'Server Error'});
 });


 // GetByID sans erreur
it('should fetch by id with no error',() => {
  // Mock de données pour le test
  // Arrange
  const mockPost : Post = 
  {
    id : '1', 
    title : 'Post 1', 
    content : 'Content 1', 
    author : 'Author 1'
  }

  // Act
  service.getPostById('1').subscribe(post => {
    // Assert
    expect(post).toEqual(mockPost);
  });
  // Arrange
  const req = httpMock.expectOne('http://localhost:3000/posts/1');
  expect(req.request.method).toBe('GET');

  req.flush(mockPost);

});


// GetByID avec erreur
it('should fetch by id with error',() => {
  service.getPostById('1').subscribe({
    next : () => fail('Expected an error, not posts'),
    error : (error) => {
      expect(error.status).toBe(404);
    }
  });
const req = httpMock.expectOne('http://localhost:3000/posts/1');

req.flush(null ,  {status : 404, statusText : 'Not Found'} )

})


 // Post
it('should create a post with no error', () => {
  // Mock de données pour la valeur a ajouter
  const input : AddPost = {
    title : 'New Post',
    content : 'New Content',
    author : 'New Author'
  }

  // Mock de données pour la réponse attendue
  const mockResponse : Post = {
    ...input,
    id : '123'
  }

  // Appel de la méthode addPost
  service.addPost(input).subscribe(post => {
    // Verification du retour de la méthode
    expect(post.title).toBe(input.title);
    expect(post.content).toBe(input.content);
    expect(post.author).toBe(input.author);
    // Verification de l'id généré
    expect(post.id).toBeDefined();
  })

// Configuration de la requête HTTP simulée
  const req = httpMock.expectOne('http://localhost:3000/posts');
  // Verification du verbe HTTP utilisée
  expect(req.request.method).toBe('POST');

  // Envoi de la réponse simulée
  req.flush(mockResponse);
  
})


// Update
it('should update a post ', () => {
  // Mock de données pour la valeur à mettre à jour
  const updatedPost : Post = {
    id : '1',
    title : 'Updated Title',
    content : 'Updated Content',
    author : 'Author'
  }

  // Appel de la méthode updatePost
service.updatePost(updatedPost).subscribe(post => {
  // Verification du retour de la méthode
  expect(post.title).toBe('Updated Title');
  expect(post.content).toBe('Updated Content');
  expect(post.id).toBe('1');
  expect(post.author).toBe('Author');
})

// Configuration de la requête HTTP simulée
const req = httpMock.expectOne('http://localhost:3000/posts/1');

// Verification du verbe HTTP utilisée
expect(req.request.method).toBe('PUT');

// Envoi de la réponse simulée
req.flush(updatedPost);

})


// Delete
it('should delete a post', () => {

  service.deletePost('1').subscribe(response => {
    expect(response).toBeNull()
  })

  const req = httpMock.expectOne('http://localhost:3000/posts/1');

  expect(req.request.method).toBe('DELETE');


  req.flush(null);
})


// Delete avec erreur
it('should delete a post with error', () => {
  service.deletePost('1').subscribe({
    next : () => fail('Expected an error, not posts'),
    error : (error) => {
      expect(error.status).toBe(500);
    }
  })

    const req = httpMock.expectOne('http://localhost:3000/posts/1');

  expect(req.request.method).toBe('DELETE');

  req.flush(null, {status : 500, statusText : 'Server Error'});
})

});
