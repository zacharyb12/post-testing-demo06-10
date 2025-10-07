import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetails } from './post-details';
import { PostService } from '../../services/post-service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('PostDetails', () => {
  // Declaration
  let component: PostDetails;
  let fixture: ComponentFixture<PostDetails>;
  // Espion pour mocker les dépendances
  let serviceSpy : jasmine.SpyObj<PostService>;
  let routerSpy : jasmine.SpyObj<Router>;
  let mockactivatedRouteSpy : Partial<ActivatedRoute>;

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
      imports: [PostDetails]
    })
    .compileComponents();


    fixture = TestBed.createComponent(PostDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
