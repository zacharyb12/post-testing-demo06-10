import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostList } from './post-list';
import { PostService } from '../../services/post-service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Post } from '../../models/post.model';

describe('PostList', () => {
  let component: PostList;
  let fixture: ComponentFixture<PostList>;
  
  // permet de simuler le service
  let postServiceSpy : jasmine.SpyObj<PostService>;
  
  // permet de simuler le routeur
  let routerSpy : jasmine.SpyObj<Router>

  beforeEach(async () => {
    // Créer des objets espion pour PostService et Router
    postServiceSpy = jasmine.createSpyObj('PostService', ['getPosts']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    // Simuler une réponse vide pour getPosts avec RxJS 'of' qui renvoie un Observable
    postServiceSpy.getPosts.and.returnValue(of([]))

    await TestBed.configureTestingModule({
      imports: [PostList],
      providers : [
        // fournir les espions au lieu des vraies dépendances
        {provide : PostService , useValue : postServiceSpy},
        {provide : Router , useValue : routerSpy}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostList);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Verification au chargement du composant
  it('should load posts on init', () => {
    const mockPosts : Post[] = [
      {id: '1', title: 'Post 1', content: 'Content 1', author : 'Author 1'},
      {id: '2', title: 'Post 2', content: 'Content 2', author : 'Author 2'},
    ];

    postServiceSpy.getPosts.and.returnValue(of(mockPosts));

    component.getPosts();

    expect(postServiceSpy.getPosts).toHaveBeenCalled();

    expect(component.posts).toEqual(mockPosts);

});

// // Verification de la navigation
it('should navigate to details', () => {
  component.navigateToDetails('42');

  expect(routerSpy.navigate).toHaveBeenCalledWith(['/post-detail', '42']);
})

it('should return error with admin', () => {
expect(() => component.navigateToDetails('admin')).toThrowError('Invalid post ID')
})



});
