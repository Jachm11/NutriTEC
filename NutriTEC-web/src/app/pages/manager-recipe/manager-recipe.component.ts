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
export class ManagerRecipeComponent implements OnInit {



  recipes = [];


  constructor(private global:GlobalService,private dialog:MatDialog, private apiService:ApiService) { }

  ngOnInit(): void {

    this.get_recipes();

  }

  get_recipes(){

    this.apiService.get_recipes().subscribe((recipes)=>{

      this.recipes = recipes;
      console.log(this.recipes);

    });
    
  }


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



  delete_recipe(recipe:any){

    this.apiService.delete_recipe(recipe.id).subscribe(()=>{

    this.global.transactionSuccess("Se eliminó la receta exitosamente");
    this.get_recipes();
    
    }, (err)=>{

      this.global.transactionFailed(err.error);

    });
    
  

  }

  add_recipe(recipe:any){


    let body = {id_client : this.global.current_client.id, recipe_name : recipe.name};
    this.apiService.post_recipe(body).subscribe((new_recipe)=> {

  
      let products = recipe.products;
 
      products.forEach(product => {

        let body = {id_recipe: recipe.id, id_product: product.id, porciones: product.porciones }
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
