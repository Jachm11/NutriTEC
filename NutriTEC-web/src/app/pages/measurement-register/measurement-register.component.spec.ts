import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementRegisterComponent } from './measurement-register.component';

describe('MeasurementRegisterComponent', () => {
  let component: MeasurementRegisterComponent;
  let fixture: ComponentFixture<MeasurementRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasurementRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
