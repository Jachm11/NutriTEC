import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerRecipeComponent } from './manager-recipe.component';

describe('ManagerRecipeComponent', () => {
  let component: ManagerRecipeComponent;
  let fixture: ComponentFixture<ManagerRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerRecipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
