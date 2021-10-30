import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignClientItemComponent } from './assign-client-item.component';

describe('AssignClientItemComponent', () => {
  let component: AssignClientItemComponent;
  let fixture: ComponentFixture<AssignClientItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignClientItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignClientItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
