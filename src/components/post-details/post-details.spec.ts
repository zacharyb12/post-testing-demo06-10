import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostDetails } from './post-details';
import { PostService } from '../../services/post-service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Post } from '../../models/post.model';

describe('PostDetails', () => {
  // Declaration
  let component: PostDetails;
  let fixture: ComponentFixture<PostDetails>;
  // Espion pour mocker les dépendances
  let serviceSpy : jasmine.SpyObj<PostService>;
  let routerSpy : jasmine.SpyObj<Router>;
  let mockactivatedRouteSpy : Partial<ActivatedRoute>;

  const mockPost : Post = {
      id : '1',
      title : 'Test Post',
      content : 'This is a test post.',
      author : 'John Doe'
    };


  beforeEach(async () => {
    // Configuration des espions
    serviceSpy = jasmine.createSpyObj( 'PostService' , ['getPostById', 'deletePost']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    // Mock ActivatedRoute
    mockactivatedRouteSpy = {
      snapshot : { params : { id : '1'} }
    } as unknown as  Partial<ActivatedRoute>;

    // Retour par defaut pour le getPostById
    serviceSpy.getPostById.and.returnValue(of(
      {
        id : '1',
        title : 'Test Post',
        content : 'This is a test post.',
        author : 'John Doe'
      }
    ));


    await TestBed.configureTestingModule({
      imports: [PostDetails],
      providers : [
        {provide : PostService , useValue : serviceSpy},
        {provide : Router , useValue : routerSpy},
        {provide : ActivatedRoute , useValue : mockactivatedRouteSpy}
      ]
    })
    .compileComponents();


    fixture = TestBed.createComponent(PostDetails);
    component = fixture.componentInstance;
  });

  afterEach(() => {})

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return post onLoad',() => {
    serviceSpy.getPostById.and.returnValue(of(mockPost));

    expect(serviceSpy.getPostById).toHaveBeenCalledWith('1');

    expect(component.post).toEqual(mockPost);  
  })


  it('should log error', () => {
    
    spyOn(console, 'error');

    serviceSpy.getPostById.and.returnValue(
      throwError(
        () => new Error('Error fetching post by id:')
      ));

    component.getPost();

      expect(console.error).toHaveBeenCalledWith('Error fetching post by id:', jasmine.any(Error));
  });

  it('should navigate to update' , () => {
    component.id = '1';
    component.navigateToUpdate('1');

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/post-update', '1']);
  })

});