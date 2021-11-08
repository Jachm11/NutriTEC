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

    this.apiService.get_recipes().subscribe((recipes)=>{


      this.recipes = recipes;



    })

  }



  get_recipes(){

    this.apiService.get_recipes().subscribe((recipes)=>{


      this.recipes = recipes;



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
    //Se realiza la consulta al API
    console.log("Se debe eliminar la receta");
    this.recipes = this.recipes.filter(r => r.nombre !== recipe.nombre);
    this.global.transactionSuccess("Se eliminó la receta exitosamente");

  }

  add_recipe(recipe:any){
    //Se realiza la consulta al api
    this.recipes.push(recipe);
    console.log("data " + recipe);
    console.log("Se agrega exitosamente la receta");
    this.global.transactionSuccess(`Se agrego la receta exitosamente`);

  }


  edit_recipe(recipe:any){
    //Se realiza la consulta al api
    this.recipes = this.recipes.filter(r => r.nombre !== recipe.nombre);
    this.recipes.push(recipe);
    this.global.transactionFailed(`Se editó la receta exitosamente`);




  }





}
