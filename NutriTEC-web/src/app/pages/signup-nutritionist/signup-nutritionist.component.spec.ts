import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupNutritionistComponent } from './signup-nutritionist.component';

describe('SignupNutritionistComponent', () => {
  let component: SignupNutritionistComponent;
  let fixture: ComponentFixture<SignupNutritionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupNutritionistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupNutritionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
