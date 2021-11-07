import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaRowHolderComponent } from './ficha-row-holder.component';

describe('FichaRowHolderComponent', () => {
  let component: FichaRowHolderComponent;
  let fixture: ComponentFixture<FichaRowHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaRowHolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaRowHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
