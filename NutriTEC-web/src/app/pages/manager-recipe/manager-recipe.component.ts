import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddEditComponent } from 'src/app/components/add-edit/add-edit.component';
import { AddEditPlanComponent } from 'src/app/components/plan/add-edit-plan/add-edit-plan.component';
import { ItemRecipeAddComponent } from 'src/app/components/recipe/item-recipe-add/item-recipe-add.component';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-manager-recipe',
  templateUrl: './manager-recipe.component.html',
  styleUrls: ['./manager-recipe.component.css']
})
export class ManagerRecipeComponent implements OnInit {



  recipes = [

    {
      nombre: "receta1",
      productos: [

        {
          producto: {
            nombre:"manzana con uva",
            descripcion:"Fruta con gran cantidad de nutrientes",
            porcion:"1 pieza",
            barcode:"121232323232",
            proteina: 300,
            vitamina: 300,
            calcio:200,
            hierro:130,
            energia:200,
            grasa:220,
            sodio:100,
            carbohidratos:200
          },
          porcion: 3
        }

       

      ]
    },
    {
      nombre: "receta2",
      productos: [

        {
          producto: {
            nombre:"manzana con uva",
            descripcion:"Fruta con gran cantidad de nutrientes",
            porcion:"1 pieza",
            barcode:"121232323232",
            proteina: 300,
            vitamina: 300,
            calcio:200,
            hierro:130,
            energia:200,
            grasa:220,
            sodio:100,
            carbohidratos:200
          },
          porcion: 3
        }

       

      ]
    },
    {
      nombre: "receta3",
      productos: [

        {
          producto: {
            nombre:"manzana con uva",
            descripcion:"Fruta con gran cantidad de nutrientes",
            porcion:"1 pieza",
            barcode:"121232323232",
            proteina: 300,
            vitamina: 300,
            calcio:200,
            hierro:130,
            energia:200,
            grasa:220,
            sodio:100,
            carbohidratos:200
          },
          porcion: 3
        }

       

      ]
    }

  ]

  constructor(private global:GlobalService,private dialog:MatDialog) { }

  ngOnInit(): void {
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
