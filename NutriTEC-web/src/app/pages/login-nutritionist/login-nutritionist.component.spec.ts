import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginNutritionistComponent } from './login-nutritionist.component';

describe('LoginNutritionistComponent', () => {
  let component: LoginNutritionistComponent;
  let fixture: ComponentFixture<LoginNutritionistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginNutritionistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginNutritionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
