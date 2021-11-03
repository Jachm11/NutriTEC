import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssingPlanComponent } from './assing-plan.component';

describe('AssingPlanComponent', () => {
  let component: AssingPlanComponent;
  let fixture: ComponentFixture<AssingPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssingPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssingPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
