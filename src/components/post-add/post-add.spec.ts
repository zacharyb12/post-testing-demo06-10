import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAdd } from './post-add';

describe('PostAdd', () => {
  let component: PostAdd;
  let fixture: ComponentFixture<PostAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
