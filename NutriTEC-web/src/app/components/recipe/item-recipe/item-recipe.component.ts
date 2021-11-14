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


/**
 * Este componente es una abstraccion de la receta de la base de datos, posee todos los 
 * atributos posibles y los muestra. Ademas, permite editar, eliminar o mostrar la informacion 
 * nutricional de la receta. 
 */
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



  /**
   * Funcion que se ejecuta cuando se comienza a editar una receta
   */
  edit(){

    this.global.current_recipe = this.recipe;
    this.edit_recipe.emit();
    
  }


  /**
   * Funcion que se ejecuta cuando se desea elimianr una receta
   */
  delete(){
    this.delete_recipe.emit(this.recipe);


  }


  /**
   * Funcion que se llama cuando se desea elimianr la informacion nutricional de la receta
   */
  show_recipe_info(){
    this.dialog.open(ShowRecipeInfoComponent, {
      data : this.recipe
    });
  }

}
