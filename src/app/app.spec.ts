import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { ActivatedRoute, Router } from '@angular/router';

describe('App', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        {provide :Router , useValue : {navigate : jasmine.createSpy('navigate')}},
        {provide : ActivatedRoute , useValue : {snapshot : {params : {}}}}
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


});
