import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRecipeInfoComponent } from './show-recipe-info.component';

describe('ShowRecipeInfoComponent', () => {
  let component: ShowRecipeInfoComponent;
  let fixture: ComponentFixture<ShowRecipeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowRecipeInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRecipeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
