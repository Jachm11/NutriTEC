import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemRecipeAddComponent } from './item-recipe-add.component';

describe('ItemRecipeAddComponent', () => {
  let component: ItemRecipeAddComponent;
  let fixture: ComponentFixture<ItemRecipeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemRecipeAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemRecipeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
