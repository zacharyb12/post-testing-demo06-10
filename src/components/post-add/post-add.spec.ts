import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAdd } from './post-add';
import { PostService } from '../../services/post-service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPost } from '../../models/add-post.model';
import { of, throwError } from 'rxjs';

describe('PostAdd', () => {
  let component: PostAdd;
  let fixture: ComponentFixture<PostAdd>;

  // injection dans le composant

  // service
  let postServiceSpy : jasmine.SpyObj<PostService>;
  // Router
  let routerSpy : jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Configuration de l'utilisation des Espions
    postServiceSpy = jasmine.createSpyObj('PostService' , ['addPost'])
    routerSpy = jasmine.createSpyObj('Router' , ['navigate'])

    await TestBed.configureTestingModule({
      imports: [
        PostAdd,
        ReactiveFormsModule,
        FormsModule
      ],
      providers : [
        // On Definit les Espions a la place des services reels
        {provide : PostService , useValue : postServiceSpy},
        {provide : Router , useValue : routerSpy}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    expect(component.newPost).toBeTruthy();
  });

  it('should initialize the form' , () => {
    const form = component.newPost;

    expect(form.get('title')?.value).toBe('')
    expect(form.get('content')?.value).toBe('')
    expect(form.get('author')?.value).toBe('')
  })

  it('should call AddPost and Navigate with formValid' , () => {

    const mockPost : AddPost = {
      title : 'Test Title',
      author : 'Test Author',
      content : 'Test Content'
    }

    // Remplir le formulaire
    component.newPost.setValue(mockPost);

    // Definir le comportement du service Espion
    postServiceSpy.addPost.and.returnValue(of({...mockPost , id : '1'}))

    // Appel de la methode a tester
    component.addPost();

    // Verifications si le service a ete appele avec les bons parametres
    expect(postServiceSpy.addPost).toHaveBeenCalledWith(mockPost);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/'])
  })

  it('should not call service with invalid form' , () => {

    // Valeur pour rendre le formulaire invalide
    const mockPost : AddPost = {
      title : '',
      author : '',
      content : ''
    }

    // Remplir le formulaire
    component.newPost.setValue(mockPost);

    // appel de la methode a tester
     component.addPost();


    // Verification que le service n'a pas ete appele
    expect(postServiceSpy.addPost).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();

  })

  it('should log error',() => {
    // Valeur pour le formulaire
    const mockPost : AddPost = { title : 'Bad Post' , author : 'Error Author' , content : 'Error Content'}
    // erreur a renvoyer par le service
    const mockError ={status : 500 , message : 'Server Error'}

    // Remplir le formulaire
    component.newPost.setValue(mockPost);

    // Espion sur la console d'erreur
    spyOn(console , 'error');


    // le service renvoie une erreur
    postServiceSpy.addPost.and.returnValue( throwError(() => mockError));


    // Appel de la methode a tester
    component.addPost();


    // Verification Les actions et valeurs

    // Verifie que le service a ete appele avec les bonnes valeurs
    expect(postServiceSpy.addPost).toHaveBeenCalledWith(mockPost);

    // Verifie que la bonne erreur a ete logguee
    expect(console.error).toHaveBeenCalledWith('Error adding post:', mockError);

    // Verifie que la navigation n'a pas été appelée
    expect(routerSpy.navigate).not.toHaveBeenCalled();

  })



});
