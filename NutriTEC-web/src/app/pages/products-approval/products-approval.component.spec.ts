import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsApprovalComponent } from './products-approval.component';

describe('ProductsApprovalComponent', () => {
  let component: ProductsApprovalComponent;
  let fixture: ComponentFixture<ProductsApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
