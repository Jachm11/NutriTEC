import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddEditComponent } from 'src/app/components/add-edit/add-edit.component';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-manager-recipe',
  templateUrl: './manager-recipe.component.html',
  styleUrls: ['./manager-recipe.component.css']
})

/**
 * Pagina que muestra la gestion de una receta
 */
export class ManagerRecipeComponent implements OnInit {



  recipes = [];


  constructor(private global:GlobalService,private dialog:MatDialog, private apiService:ApiService) { }

  ngOnInit(): void {

    this.get_recipes();

  }


  /**
   * Funcion que obtiene las recetas de un cliente que se encuentra en sesion. 
   */
  get_recipes(){

    this.apiService.get_recipes().subscribe((recipes)=>{

      this.recipes = recipes;
      console.log(this.recipes);

    });
    
  }


  /**
   * Funcion que se ejecuta cuando se crea una receta. Abre un dialog para ingresar los datos 
   * de la nueva receta
   */
  open_add_dialog(){

    this.global.startAdding();

    const dialogRef = this.dialog.open(AddEditComponent);
    const subscribeDialog = dialogRef.componentInstance.apply.subscribe((recipe) => {
      this.add_recipe(recipe);
    })

    dialogRef.afterClosed().subscribe(result =>{
      subscribeDialog.unsubscribe();
    })
  }


  /**
   * Funcion que se ejecuta cuando se edita una receta. Abre un dialog para ingresar los
   * cambios que se desean crear. 
   */
  open_edit_dialog(){

    this.global.startEditing();
    const dialogRef = this.dialog.open(AddEditComponent);
    const subscribeDialog = dialogRef.componentInstance.apply.subscribe((recipe) => {
      this.edit_recipe(recipe);
    })

    dialogRef.afterClosed().subscribe(result =>{
      subscribeDialog.unsubscribe();
    })

  }



  /**
   * Funcion que se ejecuta cuando se desea elimianr una receta
   * @param recipe 
   */
  delete_recipe(recipe:any){

    this.apiService.delete_recipe(recipe.id).subscribe(()=>{

    this.global.transactionSuccess("Se eliminó la receta exitosamente");
    this.get_recipes();
    
    }, (err)=>{

      this.global.transactionFailed(err.error);

    });
    
  

  }




  /**
   * Funcion que agrega una nueva receta y sus productos.
   * @param recipe 
   */
  add_recipe(recipe:any){


    let body = {id_client : this.global.current_client.id, recipe_name : recipe.name};
    this.apiService.post_recipe(body).subscribe((new_recipe)=> {

  
      let products = recipe.products;

      console.log(new_recipe);
 
      products.forEach(product => {

        let body = {id_recipe: new_recipe.id, id_product: product.id, porciones: product.porciones }
        this.apiService.add_product_to_recipe(body).subscribe();


      });



      this.global.transactionSuccess(`Se agrego la receta exitosamente`);
      this.get_recipes();


    }, (err)=> {

      this.global.transactionFailed(err.error);
      });
    }
    



  edit_recipe(recipe:any){

    let body = {id_client:this.global.current_client.id, id_recipe: this.global.current_recipe.id, name: recipe.name};
    this.apiService.update_recipe(body).subscribe(()=>{

      this.get_recipes();
      this.global.transactionSuccess(`Se actualizó la receta exitosamente`);


    }, (err)=> {

      this.global.transactionFailed(err.error);

    });






  }





}
