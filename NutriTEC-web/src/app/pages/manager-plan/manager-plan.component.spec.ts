import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerPlanComponent } from './manager-plan.component';

describe('ManagerPlanComponent', () => {
  let component: ManagerPlanComponent;
  let fixture: ComponentFixture<ManagerPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
