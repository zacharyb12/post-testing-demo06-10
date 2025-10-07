import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { PostService } from './post-service';
import { Post } from '../models/post.model';

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
 it('should fetch posts',()=> {
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
 it('should return error',()=> {

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
it('should fetch by id ',() => {
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
it('should return error',() => {
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

 // Update

 // Delete


});
