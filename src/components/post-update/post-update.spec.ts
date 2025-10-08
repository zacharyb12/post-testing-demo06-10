import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostUpdate } from './post-update';
import { PostService } from '../../services/post-service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { Post } from '../../models/post.model';

describe('PostUpdate', () => {
  let component: PostUpdate;
  let fixture: ComponentFixture<PostUpdate>;

  // Espions 

  // espion du service
  let postServiceSpy : jasmine.SpyObj<PostService>;

  // espion du router
 let routerSpy : jasmine.SpyObj<Router>;

  // mock de l'activatedRoute
  let activatedrouteMock : Partial<ActivatedRoute>;

  beforeEach(async () => {
    // Configuration des espions

    // definitions des methodes utilisees dans le component
    postServiceSpy = jasmine.createSpyObj('PostService', 
      [
        'getPostById',
        'updatePost',
        'deletePost'
      ])

      // definition des methodes utilisees par le router
      routerSpy = jasmine.createSpyObj('Router', ['navigate'])
    
      // definition du mock de l'activatedRoute
      activatedrouteMock = {
        snapshot : {
          params : { id : '1' }
        }
      } as unknown as Partial<ActivatedRoute>;

      // configuration du retour de l'espion getPostById
      postServiceSpy.getPostById.and.returnValue(of(
        {
          id : '1',
          title : 'Test Post',
          content : 'This is a test post',
          author : 'John Doe'
        }
      ))
    
    await TestBed.configureTestingModule({
      // import et configuration du component de test
      imports: [PostUpdate , ReactiveFormsModule],
      providers : [
        // definition des espions et mock a utiliser
        { provide : PostService , useValue : postServiceSpy },
        { provide : Router , useValue : routerSpy},
        {provide : ActivatedRoute , useValue : activatedrouteMock}
      ]
    })
    .compileComponents();


    fixture = TestBed.createComponent(PostUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('should create the form', () => {
    expect(component.updateForm).toBeTruthy();
  });

  it('should load data on init into the form ', () => {
    // mock pour verifier les donnees recuperees
    const mockPost : Post = {
      id : '1',
      title : 'Test Post',
      content : 'This is a test post',
      author : 'John Doe'
    }

    // Definition du retour de l'espion getPostById
    postServiceSpy.getPostById.and.returnValue(of(mockPost));

    // appel de la methode getPost
    component.getPost();

    // verification que le service a ete appele avec le bon id
    expect(postServiceSpy.getPostById).toHaveBeenCalledWith('1');

    //verification que le formulaire a ete initialise avec les bonnes valeurs
    expect(component.updateForm.value.title).toEqual(mockPost.title);
    expect(component.updateForm.value.content).toEqual(mockPost.content);

    // Verification du chargement de la variable postToUpdate
    expect(component.postToUpdate).toEqual(mockPost);

  })

  // Verification Erreur au chargement du post


  // Verification de la methode updatePost et de la navigation


  // Verification Erreur lors de la mise a jour

  
  // Verification de la methode deletePost et de la navigation


  // Verification Erreur lors de la suppression du post


});
