import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPlanInfoComponent } from './show-plan-info.component';

describe('ShowPlanInfoComponent', () => {
  let component: ShowPlanInfoComponent;
  let fixture: ComponentFixture<ShowPlanInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPlanInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPlanInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
