import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyRegisterComponent } from './daily-register.component';

describe('DailyRegisterComponent', () => {
  let component: DailyRegisterComponent;
  let fixture: ComponentFixture<DailyRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
