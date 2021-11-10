import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';
import { Product } from 'src/interfaces/product';
import { ShowRecipeInfoComponent } from '../show-recipe-info/show-recipe-info.component';
@Component({
  selector: 'app-item-recipe',
  templateUrl: './item-recipe.component.html',
  styleUrls: ['./item-recipe.component.css']
})
export class ItemRecipeComponent implements OnInit {

  @Input() recipe:any;
  @Output() delete_recipe: EventEmitter<any> = new EventEmitter();
  @Output() edit_recipe : EventEmitter<any> = new EventEmitter();

  products:Product[];

  constructor(private dialog:MatDialog, private global:GlobalService, private apiService:ApiService) { }

  ngOnInit(): void {




    this.apiService.get_product_by_recipe(this.recipe.id).subscribe((products) => {

      console.log(products)
      this.products = products;

    })
  
  }


  edit(){

    this.global.current_recipe = this.recipe;
    this.edit_recipe.emit();
    
  }

  delete(){
    this.delete_recipe.emit(this.recipe);


  }

  show_recipe_info(){
    this.dialog.open(ShowRecipeInfoComponent, {
      data : this.recipe
    });
  }

}
